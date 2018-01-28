# Rails 5.2, Webpack, React, semantic-ui

_Note: all of these steps where committed individual so feel free to look at the individual changesets for more details_ [see commit history](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commits/master)

Rails 5.1 and 5.2 have some new support for webpack and react but I had some trouble getting it all working correctly. I had especially a hard time getting the semantic-ui styling working (where I could edit the themes and recompile). This repo along with the commit log and this README detail my learnings.

Resources:
- https://github.com/rails/webpacker
- https://react.semantic-ui.com/usage

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

[See Commit](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commit/d106ce80b04ca0ea1fe44d091f2b826d933d0789)

## Setup postgres/db

```
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rails s
```

Open: localhost:3000

[See Commit](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commit/654cd422da314046492e13bb13f6da032c531e44)

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

[See Commit](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commit/74ee352a6b49e6b925c0cd8888c5a6c7edbf86e6)

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

Open: localhost:5000 and see the: Hello React!

[See Commit](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commit/9a59a644bbe2d7deb315ffacb9ac7cb831683835)

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

[See Commit](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commit/f388aac3dcbd56c938f006c3a64120d8998e94c2)

## Get rid of console warnings:

- https://github.com/rails/webpacker/issues/1057

/content_security_policy.rb

```
p.connect_src :self, :https, 'http://localhost:3035', 'ws://localhost:3035' if Rails.env.development?
```

[See Commit](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commit/f3d49ed573ee97b15adf7cf4bbfd9e3462758431)

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

[See Commit](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commit/cefc7a173ef3c28ea9f180bd31341f51ac018a51)

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

[See Commit](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commit/2a61831eed2689d15eb3cc5d9dc0df7a51ff0392)

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

[See Commit for commenting out ERB](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app/commit/c6ad27927f056e656917a6d4fc2d7a0999c445c6)
