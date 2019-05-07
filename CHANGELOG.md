Simple changelog to keep up with my main edits in code.

Setting up the environment
-
* Created local.json file for postgres configuration.
* Installed pm2 to launch 'yarn watch'

Adding client update functionality
-
* Created sql query ('updateFirstAndLast.sql') for updating client
* Added method to controller for updating client. Method works with both arguments (firstname, surname), one argument or zero arguments given.
* Updated ClientModel.js, routes.js, queries.js and swagger.json files according to new method.
* Method is accessable from route: '/api/v1/clients/update/:clientId'.
* Created new sql queries to allow to update only first name or only surname. Also edited controller method.

Eslint errors
-
* Fixed eslint errors in test.js files.

Tests
-
* Wrote test for client update method.
    * After running this test, I discovered that the update method is not correct, and edited update method.
* Wrote tests for one parameter updates.
* Wrote few integration tests.