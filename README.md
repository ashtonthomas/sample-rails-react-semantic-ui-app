# Rails 5.2 with React/Webpack and the semantic-ui full style package

_Note: all of these steps where committed individual so feel free to look at the individual changesets for more details_

## Some setup:

apm install react
brew install postgres # setup postgres (startup, launch, createdb)
brew install yarn
brew the other crap you need

ruby-install ruby 2.5.0
chruby ruby-2.5.0 #yes, I still use chruby - get over it

```
gem install rails --pre
rails -v #=> Rails 5.2.0.beta2
```

## Create a new rails app with react:

```
rails new sample-rails-react-semantic-ui-app --webpack=react -d postgresql --skip-turbolinks --skip-coffee --skip-action-cable
cd sample-rails-react-semantic-ui-app
```

## Setup postgres/db

```
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rails s
```

Open: localhost:3000

## Use foreman:

```
touch Procfile
```

Add contents:

```
web: bundle exec rails s
webpacker: ./bin/webpack-dev-server
```

Now get foreman active:

```
gem install foreman
bundle binstubs bundler --force
foreman start
```
Open: http://localhost:5000/

## Add controller with action that renders a react component:

```
bundle exec rails g controller Site signup
```

include the react component in app/views/site/signup.html.erb

```
<%= javascript_pack_tag 'hello_react' %>
```

`config/routes.rb`

```
root 'site#signup'
```

Now fire up the app

```
foreman start
```

# Open: localhost:5000 and see the: Hello React!

## Utilize semantic ui component (no css yet)

- https://medium.com/superhighfives/a-top-shelf-web-stack-rails-5-api-activeadmin-create-react-app-de5481b7ec0b
- https://react.semantic-ui.com/usage

```
yarn add semantic-ui-react
```

Now update /hello_react.jsx

```
import { Button } from 'semantic-ui-react'

# in the render method (see code for full example)
<Button onClick={() => console.log("Click!") }>
  The Button Here
</Button>
```

```
foreman start
```

Open app and see the unstyled button (styling will come soon)
Open (Chrome) Dev Tools to see console and the click out put
You will notice errors. We will fix that next

## Get rid of console warnings:

- https://github.com/rails/webpacker/issues/1057

/content_security_policy.rb

```
p.connect_src :self, :https, 'http://localhost:3035', 'ws://localhost:3035' if Rails.env.development?
```

## Get semantic-ui package setup and active

The below will hang on: `semantic-ui: Starting 'run setup'`
- https://github.com/yarnpkg/yarn/issues/976#issuecomment-328330324

```
yarn add semantic-ui --dev
```

Kill the setup
copy node_modules/semantic-ui/semantic.json.example > root/semantic.ui (and set autoInstall to true)

```
cp node_modules/semantic-ui/semantic.json.example semantic.json
```

now set autoInstall to true and re-run yarn

```
yarn add semantic-ui --dev
```

I'm not sure, but you may want to add dist/ to .gitignore
This may require others to run gulp build for the semantic ui assets
but may keep commits cleaner in the future (I dunno?)

Now, import css in your component: app/jacascript/packs/hello_react.jsx

```
import '../../../dist/semantic.min.css';
```

ALSO INCLUDE THE stylesheet_pack_tag with the same component name
in the view: app/views/site/signup.html.erb
_(this wasted a lot of my time)_

```
<%= stylesheet_pack_tag 'hello_react' %>
```

Now, reloading the app should apply the semantic-ui styling



## Edit the css

open up a src/themes/default/elements/button.variables and change some colors

```
@hoverBackgroundColor: #000000;
```

rebuild the dist/ files with the gulp task

```
gulp build
```

Now when you hover, the button goes all black
Question: How the hell do I change the folder name from 'src/' to anything else?

## Deploy to heroku

```
heroku create ails-react-semantic-ui
heroku addons:create heroku-postgresql
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/ruby
git push heroku master

# comment out some `# Rails.application.credentials` stuff in storage.yml

heroku open
```
