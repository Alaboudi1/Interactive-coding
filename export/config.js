System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    "ace": "github:ajaxorg/ace-builds@1.2.6",
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.1",
    "aurelia-dialog": "npm:aurelia-dialog@1.0.0-beta.3.0.1",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.1.0",
    "aurelia-framework": "npm:aurelia-framework@1.0.8",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.1.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
    "aurelia-router": "npm:aurelia-router@1.1.1",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.2.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.2.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.1",
    "bluebird": "npm:bluebird@3.4.1",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "esprima": "npm:esprima@2.7.3",
    "estraverse": "npm:estraverse@4.2.0",
    "faker": "npm:faker@3.1.0",
    "fetch": "github:github/fetch@1.1.1",
    "font-awesome": "npm:font-awesome@4.6.3",
    "jquery": "npm:jquery@2.2.4",
    "text": "github:systemjs/plugin-text@0.0.8",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:twbs/bootstrap@3.3.7": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-binding@1.1.1": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:aurelia-bootstrapper@1.0.1": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.8",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.1.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.1.1",
      "aurelia-templating": "npm:aurelia-templating@1.2.0",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.2.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.2.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.1"
    },
    "npm:aurelia-dependency-injection@1.3.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-dialog@1.0.0-beta.3.0.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-event-aggregator@1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0"
    },
    "npm:aurelia-framework@1.0.8": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-loader-default@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.2.0"
    },
    "npm:aurelia-metadata@1.0.3": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-pal-browser@1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-polyfills@1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-route-recognizer@1.1.0": {
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-router@1.1.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.1.0"
    },
    "npm:aurelia-task-queue@1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.2.0"
    },
    "npm:aurelia-templating-binding@1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-templating-resources@1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-templating-router@1.0.1": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.1.1",
      "aurelia-templating": "npm:aurelia-templating@1.2.0"
    },
    "npm:aurelia-templating@1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.3.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.3",
      "aurelia-pal": "npm:aurelia-pal@1.2.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:bluebird@3.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.8",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:estraverse@4.2.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:faker@3.1.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.32"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  },
  bundles: {
    "app-build-2fa9ae7287.js": [
      "app.html!github:systemjs/plugin-text@0.0.8.js",
      "app.js",
      "dialog/dialog-controler.js",
      "dialog/dialog.css!github:systemjs/plugin-text@0.0.8.js",
      "dialog/dialog.html!github:systemjs/plugin-text@0.0.8.js",
      "dialog/dialog.js",
      "dialog/displayResult.js",
      "dialog/page1.html!github:systemjs/plugin-text@0.0.8.js",
      "dialog/page2.html!github:systemjs/plugin-text@0.0.8.js",
      "dialog/page3.html!github:systemjs/plugin-text@0.0.8.js",
      "dialog/page4.html!github:systemjs/plugin-text@0.0.8.js",
      "editor/config/ace.js",
      "editor/config/mode-javascript.js",
      "editor/config/theme-chrome.js",
      "editor/config/worker-javascript.js",
      "editor/editor.css!github:systemjs/plugin-text@0.0.8.js",
      "editor/editor.html!github:systemjs/plugin-text@0.0.8.js",
      "editor/editor.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "main.js",
      "npm:aurelia-binding@1.1.1.js",
      "npm:aurelia-binding@1.1.1/aurelia-binding.js",
      "npm:aurelia-dependency-injection@1.3.0.js",
      "npm:aurelia-dependency-injection@1.3.0/aurelia-dependency-injection.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog-body.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog-footer.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog-header.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/attach-focus.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/aurelia-dialog.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-configuration.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-controller.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-options.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-renderer.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-result.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-service.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/lifecycle.js",
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/renderer.js",
      "npm:aurelia-event-aggregator@1.0.1.js",
      "npm:aurelia-event-aggregator@1.0.1/aurelia-event-aggregator.js",
      "npm:aurelia-framework@1.0.8.js",
      "npm:aurelia-framework@1.0.8/aurelia-framework.js",
      "npm:aurelia-loader@1.0.0.js",
      "npm:aurelia-loader@1.0.0/aurelia-loader.js",
      "npm:aurelia-logging@1.2.0.js",
      "npm:aurelia-logging@1.2.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.3.js",
      "npm:aurelia-metadata@1.0.3/aurelia-metadata.js",
      "npm:aurelia-pal@1.2.0.js",
      "npm:aurelia-pal@1.2.0/aurelia-pal.js",
      "npm:aurelia-path@1.1.1.js",
      "npm:aurelia-path@1.1.1/aurelia-path.js",
      "npm:aurelia-task-queue@1.1.0.js",
      "npm:aurelia-task-queue@1.1.0/aurelia-task-queue.js",
      "npm:aurelia-templating@1.2.0.js",
      "npm:aurelia-templating@1.2.0/aurelia-templating.js",
      "npm:esprima@2.7.3.js",
      "npm:esprima@2.7.3/esprima.js",
      "npm:estraverse@4.2.0.js",
      "npm:estraverse@4.2.0/estraverse.js",
      "npm:estraverse@4.2.0/package.json!github:systemjs/plugin-json@0.1.2.js",
      "npm:faker@3.1.0/lib/address.js",
      "npm:faker@3.1.0/lib/commerce.js",
      "npm:faker@3.1.0/lib/company.js",
      "npm:faker@3.1.0/lib/date.js",
      "npm:faker@3.1.0/lib/fake.js",
      "npm:faker@3.1.0/lib/finance.js",
      "npm:faker@3.1.0/lib/hacker.js",
      "npm:faker@3.1.0/lib/helpers.js",
      "npm:faker@3.1.0/lib/image.js",
      "npm:faker@3.1.0/lib/index.js",
      "npm:faker@3.1.0/lib/internet.js",
      "npm:faker@3.1.0/lib/locales/en/address/building_number.js",
      "npm:faker@3.1.0/lib/locales/en/address/city.js",
      "npm:faker@3.1.0/lib/locales/en/address/city_prefix.js",
      "npm:faker@3.1.0/lib/locales/en/address/city_suffix.js",
      "npm:faker@3.1.0/lib/locales/en/address/country.js",
      "npm:faker@3.1.0/lib/locales/en/address/country_code.js",
      "npm:faker@3.1.0/lib/locales/en/address/county.js",
      "npm:faker@3.1.0/lib/locales/en/address/default_country.js",
      "npm:faker@3.1.0/lib/locales/en/address/index.js",
      "npm:faker@3.1.0/lib/locales/en/address/postcode.js",
      "npm:faker@3.1.0/lib/locales/en/address/postcode_by_state.js",
      "npm:faker@3.1.0/lib/locales/en/address/secondary_address.js",
      "npm:faker@3.1.0/lib/locales/en/address/state.js",
      "npm:faker@3.1.0/lib/locales/en/address/state_abbr.js",
      "npm:faker@3.1.0/lib/locales/en/address/street_address.js",
      "npm:faker@3.1.0/lib/locales/en/address/street_name.js",
      "npm:faker@3.1.0/lib/locales/en/address/street_suffix.js",
      "npm:faker@3.1.0/lib/locales/en/address/time_zone.js",
      "npm:faker@3.1.0/lib/locales/en/app/author.js",
      "npm:faker@3.1.0/lib/locales/en/app/index.js",
      "npm:faker@3.1.0/lib/locales/en/app/name.js",
      "npm:faker@3.1.0/lib/locales/en/app/version.js",
      "npm:faker@3.1.0/lib/locales/en/business/credit_card_expiry_dates.js",
      "npm:faker@3.1.0/lib/locales/en/business/credit_card_numbers.js",
      "npm:faker@3.1.0/lib/locales/en/business/credit_card_types.js",
      "npm:faker@3.1.0/lib/locales/en/business/index.js",
      "npm:faker@3.1.0/lib/locales/en/cell_phone/formats.js",
      "npm:faker@3.1.0/lib/locales/en/cell_phone/index.js",
      "npm:faker@3.1.0/lib/locales/en/commerce/color.js",
      "npm:faker@3.1.0/lib/locales/en/commerce/department.js",
      "npm:faker@3.1.0/lib/locales/en/commerce/index.js",
      "npm:faker@3.1.0/lib/locales/en/commerce/product_name.js",
      "npm:faker@3.1.0/lib/locales/en/company/adjective.js",
      "npm:faker@3.1.0/lib/locales/en/company/bs_adjective.js",
      "npm:faker@3.1.0/lib/locales/en/company/bs_noun.js",
      "npm:faker@3.1.0/lib/locales/en/company/bs_verb.js",
      "npm:faker@3.1.0/lib/locales/en/company/descriptor.js",
      "npm:faker@3.1.0/lib/locales/en/company/index.js",
      "npm:faker@3.1.0/lib/locales/en/company/name.js",
      "npm:faker@3.1.0/lib/locales/en/company/noun.js",
      "npm:faker@3.1.0/lib/locales/en/company/suffix.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/american_express.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/diners_club.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/discover.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/index.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/jcb.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/laser.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/maestro.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/mastercard.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/solo.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/switch.js",
      "npm:faker@3.1.0/lib/locales/en/credit_card/visa.js",
      "npm:faker@3.1.0/lib/locales/en/date/index.js",
      "npm:faker@3.1.0/lib/locales/en/date/month.js",
      "npm:faker@3.1.0/lib/locales/en/date/weekday.js",
      "npm:faker@3.1.0/lib/locales/en/finance/account_type.js",
      "npm:faker@3.1.0/lib/locales/en/finance/currency.js",
      "npm:faker@3.1.0/lib/locales/en/finance/index.js",
      "npm:faker@3.1.0/lib/locales/en/finance/transaction_type.js",
      "npm:faker@3.1.0/lib/locales/en/hacker/abbreviation.js",
      "npm:faker@3.1.0/lib/locales/en/hacker/adjective.js",
      "npm:faker@3.1.0/lib/locales/en/hacker/index.js",
      "npm:faker@3.1.0/lib/locales/en/hacker/ingverb.js",
      "npm:faker@3.1.0/lib/locales/en/hacker/noun.js",
      "npm:faker@3.1.0/lib/locales/en/hacker/verb.js",
      "npm:faker@3.1.0/lib/locales/en/index.js",
      "npm:faker@3.1.0/lib/locales/en/internet/avatar_uri.js",
      "npm:faker@3.1.0/lib/locales/en/internet/domain_suffix.js",
      "npm:faker@3.1.0/lib/locales/en/internet/example_email.js",
      "npm:faker@3.1.0/lib/locales/en/internet/free_email.js",
      "npm:faker@3.1.0/lib/locales/en/internet/index.js",
      "npm:faker@3.1.0/lib/locales/en/lorem/index.js",
      "npm:faker@3.1.0/lib/locales/en/lorem/supplemental.js",
      "npm:faker@3.1.0/lib/locales/en/lorem/words.js",
      "npm:faker@3.1.0/lib/locales/en/name/first_name.js",
      "npm:faker@3.1.0/lib/locales/en/name/index.js",
      "npm:faker@3.1.0/lib/locales/en/name/last_name.js",
      "npm:faker@3.1.0/lib/locales/en/name/name.js",
      "npm:faker@3.1.0/lib/locales/en/name/prefix.js",
      "npm:faker@3.1.0/lib/locales/en/name/suffix.js",
      "npm:faker@3.1.0/lib/locales/en/name/title.js",
      "npm:faker@3.1.0/lib/locales/en/phone_number/formats.js",
      "npm:faker@3.1.0/lib/locales/en/phone_number/index.js",
      "npm:faker@3.1.0/lib/locales/en/system/index.js",
      "npm:faker@3.1.0/lib/locales/en/system/mimeTypes.js",
      "npm:faker@3.1.0/lib/locales/en/team/creature.js",
      "npm:faker@3.1.0/lib/locales/en/team/index.js",
      "npm:faker@3.1.0/lib/locales/en/team/name.js",
      "npm:faker@3.1.0/lib/lorem.js",
      "npm:faker@3.1.0/lib/name.js",
      "npm:faker@3.1.0/lib/phone_number.js",
      "npm:faker@3.1.0/lib/random.js",
      "npm:faker@3.1.0/lib/system.js",
      "npm:faker@3.1.0/locale/en.js",
      "npm:faker@3.1.0/vendor/mersenne.js",
      "npm:faker@3.1.0/vendor/password-generator.js",
      "npm:faker@3.1.0/vendor/user-agent.js",
      "npm:process@0.11.9.js",
      "npm:process@0.11.9/browser.js",
      "resources/index.js",
      "resources/schema.js",
      "services/evaluator.js",
      "services/info-sign.js",
      "services/parser.js",
      "services/test.js",
      "services/traverse.js",
      "servicesBootstrapper/run.js"
    ],
    "aurelia-3b8e1e29e5.js": [
      "github:twbs/bootstrap@3.3.7/css/bootstrap.css!github:systemjs/plugin-text@0.0.8.js",
      "npm:aurelia-animator-css@1.0.1.js",
      "npm:aurelia-animator-css@1.0.1/aurelia-animator-css.js",
      "npm:aurelia-binding@1.1.1.js",
      "npm:aurelia-binding@1.1.1/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.1.js",
      "npm:aurelia-bootstrapper@1.0.1/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.3.0.js",
      "npm:aurelia-dependency-injection@1.3.0/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.1.js",
      "npm:aurelia-event-aggregator@1.0.1/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.1.0.js",
      "npm:aurelia-fetch-client@1.1.0/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.8.js",
      "npm:aurelia-framework@1.0.8/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0.js",
      "npm:aurelia-history-browser@1.0.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0.js",
      "npm:aurelia-history@1.0.0/aurelia-history.js",
      "npm:aurelia-loader-default@1.0.0.js",
      "npm:aurelia-loader-default@1.0.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0.js",
      "npm:aurelia-loader@1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0.js",
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.2.0.js",
      "npm:aurelia-logging@1.2.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.3.js",
      "npm:aurelia-metadata@1.0.3/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.1.0.js",
      "npm:aurelia-pal-browser@1.1.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.2.0.js",
      "npm:aurelia-pal@1.2.0/aurelia-pal.js",
      "npm:aurelia-path@1.1.1.js",
      "npm:aurelia-path@1.1.1/aurelia-path.js",
      "npm:aurelia-polyfills@1.1.1.js",
      "npm:aurelia-polyfills@1.1.1/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.1.0.js",
      "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.1.1.js",
      "npm:aurelia-router@1.1.1/aurelia-router.js",
      "npm:aurelia-task-queue@1.1.0.js",
      "npm:aurelia-task-queue@1.1.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.2.0.js",
      "npm:aurelia-templating-binding@1.2.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.2.0.js",
      "npm:aurelia-templating-resources@1.2.0/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.2.0/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.2.0/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/attr-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.2.0/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.2.0/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.2.0/binding-signaler.js",
      "npm:aurelia-templating-resources@1.2.0/compose.js",
      "npm:aurelia-templating-resources@1.2.0/css-resource.js",
      "npm:aurelia-templating-resources@1.2.0/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/dynamic-element.js",
      "npm:aurelia-templating-resources@1.2.0/focus.js",
      "npm:aurelia-templating-resources@1.2.0/hide.js",
      "npm:aurelia-templating-resources@1.2.0/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.2.0/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.2.0/if.js",
      "npm:aurelia-templating-resources@1.2.0/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.2.0/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.2.0/repeat.js",
      "npm:aurelia-templating-resources@1.2.0/replaceable.js",
      "npm:aurelia-templating-resources@1.2.0/sanitize-html.js",
      "npm:aurelia-templating-resources@1.2.0/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.2.0/show.js",
      "npm:aurelia-templating-resources@1.2.0/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.2.0/with.js",
      "npm:aurelia-templating-router@1.0.1.js",
      "npm:aurelia-templating-router@1.0.1/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.1/route-href.js",
      "npm:aurelia-templating-router@1.0.1/route-loader.js",
      "npm:aurelia-templating-router@1.0.1/router-view.js",
      "npm:aurelia-templating@1.2.0.js",
      "npm:aurelia-templating@1.2.0/aurelia-templating.js"
    ]
  },
  depCache: {
    "servicesBootstrapper/run.js": [
      "aurelia-framework",
      "../services/parser",
      "../services/traverse",
      "../services/info-sign",
      "../services/test",
      "../resources/schema",
      "../dialog/dialog-controler",
      "../services/evaluator"
    ],
    "npm:aurelia-framework@1.0.8.js": [
      "npm:aurelia-framework@1.0.8/aurelia-framework"
    ],
    "services/parser.js": [
      "aurelia-framework",
      "esprima",
      "aurelia-event-aggregator"
    ],
    "services/traverse.js": [
      "aurelia-framework",
      "estraverse",
      "aurelia-event-aggregator"
    ],
    "services/info-sign.js": [
      "aurelia-framework",
      "aurelia-event-aggregator"
    ],
    "services/test.js": [
      "aurelia-framework",
      "aurelia-event-aggregator",
      "faker/locale/en"
    ],
    "dialog/dialog-controler.js": [
      "aurelia-framework",
      "aurelia-event-aggregator",
      "aurelia-dialog",
      "./dialog"
    ],
    "services/evaluator.js": [
      "aurelia-framework",
      "aurelia-event-aggregator"
    ],
    "npm:aurelia-framework@1.0.8/aurelia-framework.js": [
      "aurelia-dependency-injection",
      "aurelia-binding",
      "aurelia-metadata",
      "aurelia-templating",
      "aurelia-loader",
      "aurelia-task-queue",
      "aurelia-path",
      "aurelia-pal",
      "aurelia-logging"
    ],
    "npm:esprima@2.7.3.js": [
      "npm:esprima@2.7.3/esprima.js"
    ],
    "npm:aurelia-event-aggregator@1.0.1.js": [
      "npm:aurelia-event-aggregator@1.0.1/aurelia-event-aggregator"
    ],
    "npm:estraverse@4.2.0.js": [
      "npm:estraverse@4.2.0/estraverse.js"
    ],
    "npm:faker@3.1.0/locale/en.js": [
      "../lib/index",
      "../lib/locales/en/index"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1.js": [
      "npm:aurelia-dialog@1.0.0-beta.3.0.1/aurelia-dialog"
    ],
    "dialog/dialog.js": [
      "aurelia-event-aggregator",
      "aurelia-framework",
      "aurelia-dialog"
    ],
    "npm:aurelia-dependency-injection@1.3.0.js": [
      "npm:aurelia-dependency-injection@1.3.0/aurelia-dependency-injection"
    ],
    "npm:aurelia-binding@1.1.1.js": [
      "npm:aurelia-binding@1.1.1/aurelia-binding"
    ],
    "npm:aurelia-metadata@1.0.3.js": [
      "npm:aurelia-metadata@1.0.3/aurelia-metadata"
    ],
    "npm:aurelia-templating@1.2.0.js": [
      "npm:aurelia-templating@1.2.0/aurelia-templating"
    ],
    "npm:aurelia-loader@1.0.0.js": [
      "npm:aurelia-loader@1.0.0/aurelia-loader"
    ],
    "npm:aurelia-task-queue@1.1.0.js": [
      "npm:aurelia-task-queue@1.1.0/aurelia-task-queue"
    ],
    "npm:aurelia-path@1.1.1.js": [
      "npm:aurelia-path@1.1.1/aurelia-path"
    ],
    "npm:aurelia-pal@1.2.0.js": [
      "npm:aurelia-pal@1.2.0/aurelia-pal"
    ],
    "npm:aurelia-logging@1.2.0.js": [
      "npm:aurelia-logging@1.2.0/aurelia-logging"
    ],
    "npm:aurelia-event-aggregator@1.0.1/aurelia-event-aggregator.js": [
      "aurelia-logging"
    ],
    "npm:estraverse@4.2.0/estraverse.js": [
      "./package.json!systemjs-json"
    ],
    "npm:faker@3.1.0/lib/index.js": [
      "./fake",
      "./random",
      "./helpers",
      "./name",
      "./address",
      "./company",
      "./finance",
      "./image",
      "./lorem",
      "./hacker",
      "./internet",
      "./phone_number",
      "./date",
      "./commerce",
      "./system"
    ],
    "npm:faker@3.1.0/lib/locales/en/index.js": [
      "./address/index",
      "./credit_card/index",
      "./company/index",
      "./internet/index",
      "./lorem/index",
      "./name/index",
      "./phone_number/index",
      "./cell_phone/index",
      "./business/index",
      "./commerce/index",
      "./team/index",
      "./hacker/index",
      "./app/index",
      "./finance/index",
      "./date/index",
      "./system/index"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/aurelia-dialog.js": [
      "./ai-dialog",
      "./ai-dialog-header",
      "./ai-dialog-body",
      "./ai-dialog-footer",
      "./attach-focus",
      "./dialog-configuration",
      "./dialog-service",
      "./dialog-controller",
      "./dialog-result"
    ],
    "npm:aurelia-dependency-injection@1.3.0/aurelia-dependency-injection.js": [
      "aurelia-metadata",
      "aurelia-pal"
    ],
    "npm:aurelia-binding@1.1.1/aurelia-binding.js": [
      "aurelia-logging",
      "aurelia-pal",
      "aurelia-task-queue",
      "aurelia-metadata"
    ],
    "npm:aurelia-metadata@1.0.3/aurelia-metadata.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-templating@1.2.0/aurelia-templating.js": [
      "aurelia-logging",
      "aurelia-metadata",
      "aurelia-pal",
      "aurelia-path",
      "aurelia-loader",
      "aurelia-dependency-injection",
      "aurelia-binding",
      "aurelia-task-queue"
    ],
    "npm:aurelia-loader@1.0.0/aurelia-loader.js": [
      "aurelia-path",
      "aurelia-metadata"
    ],
    "npm:aurelia-task-queue@1.1.0/aurelia-task-queue.js": [
      "aurelia-pal"
    ],
    "npm:faker@3.1.0/lib/random.js": [
      "../vendor/mersenne"
    ],
    "npm:faker@3.1.0/lib/internet.js": [
      "../vendor/password-generator",
      "../vendor/user-agent"
    ],
    "npm:faker@3.1.0/lib/locales/en/address/index.js": [
      "./city_prefix",
      "./city_suffix",
      "./county",
      "./country",
      "./country_code",
      "./building_number",
      "./street_suffix",
      "./secondary_address",
      "./postcode",
      "./postcode_by_state",
      "./state",
      "./state_abbr",
      "./time_zone",
      "./city",
      "./street_name",
      "./street_address",
      "./default_country"
    ],
    "npm:faker@3.1.0/lib/locales/en/credit_card/index.js": [
      "./visa",
      "./mastercard",
      "./discover",
      "./american_express",
      "./diners_club",
      "./jcb",
      "./switch",
      "./solo",
      "./maestro",
      "./laser"
    ],
    "npm:faker@3.1.0/lib/locales/en/company/index.js": [
      "./suffix",
      "./adjective",
      "./descriptor",
      "./noun",
      "./bs_verb",
      "./bs_adjective",
      "./bs_noun",
      "./name"
    ],
    "npm:faker@3.1.0/lib/locales/en/internet/index.js": [
      "./free_email",
      "./example_email",
      "./domain_suffix",
      "./avatar_uri"
    ],
    "npm:faker@3.1.0/lib/locales/en/lorem/index.js": [
      "./words",
      "./supplemental"
    ],
    "npm:faker@3.1.0/lib/locales/en/name/index.js": [
      "./first_name",
      "./last_name",
      "./prefix",
      "./suffix",
      "./title",
      "./name"
    ],
    "npm:faker@3.1.0/lib/locales/en/phone_number/index.js": [
      "./formats"
    ],
    "npm:faker@3.1.0/lib/locales/en/cell_phone/index.js": [
      "./formats"
    ],
    "npm:faker@3.1.0/lib/locales/en/business/index.js": [
      "./credit_card_numbers",
      "./credit_card_expiry_dates",
      "./credit_card_types"
    ],
    "npm:faker@3.1.0/lib/locales/en/commerce/index.js": [
      "./color",
      "./department",
      "./product_name"
    ],
    "npm:faker@3.1.0/lib/locales/en/team/index.js": [
      "./creature",
      "./name"
    ],
    "npm:faker@3.1.0/lib/locales/en/hacker/index.js": [
      "./abbreviation",
      "./adjective",
      "./noun",
      "./verb",
      "./ingverb"
    ],
    "npm:faker@3.1.0/lib/locales/en/app/index.js": [
      "./name",
      "./version",
      "./author"
    ],
    "npm:faker@3.1.0/lib/locales/en/finance/index.js": [
      "./account_type",
      "./transaction_type",
      "./currency"
    ],
    "npm:faker@3.1.0/lib/locales/en/date/index.js": [
      "./month",
      "./weekday"
    ],
    "npm:faker@3.1.0/lib/locales/en/system/index.js": [
      "./mimeTypes"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog.js": [
      "aurelia-templating"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog-header.js": [
      "aurelia-templating",
      "./dialog-controller"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog-body.js": [
      "aurelia-templating"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/ai-dialog-footer.js": [
      "aurelia-templating",
      "./dialog-controller"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/attach-focus.js": [
      "aurelia-templating"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-configuration.js": [
      "./renderer",
      "./dialog-renderer",
      "./dialog-options",
      "aurelia-pal"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-service.js": [
      "aurelia-metadata",
      "aurelia-dependency-injection",
      "aurelia-templating",
      "./dialog-controller",
      "./renderer",
      "./lifecycle",
      "./dialog-result",
      "./dialog-options"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-controller.js": [
      "./lifecycle",
      "./dialog-result"
    ],
    "npm:faker@3.1.0/lib/locales/en/company/noun.js": [
      "process"
    ],
    "npm:faker@3.1.0/lib/locales/en/system/mimeTypes.js": [
      "process"
    ],
    "npm:aurelia-dialog@1.0.0-beta.3.0.1/dialog-renderer.js": [
      "aurelia-pal",
      "aurelia-dependency-injection"
    ],
    "github:jspm/nodelibs-process@0.1.2.js": [
      "github:jspm/nodelibs-process@0.1.2/index"
    ],
    "github:jspm/nodelibs-process@0.1.2/index.js": [
      "process"
    ],
    "npm:process@0.11.9.js": [
      "npm:process@0.11.9/browser.js"
    ],
    "editor/editor.js": [
      "aurelia-event-aggregator",
      "aurelia-framework"
    ],
    "app.js": [
      "aurelia-framework",
      "./servicesBootstrapper/run"
    ],
    "npm:aurelia-logging-console@1.0.0.js": [
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console"
    ],
    "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js": [
      "aurelia-logging"
    ],
    "npm:aurelia-history-browser@1.0.0.js": [
      "npm:aurelia-history-browser@1.0.0/aurelia-history-browser"
    ],
    "npm:aurelia-history-browser@1.0.0/aurelia-history-browser.js": [
      "aurelia-pal",
      "aurelia-history"
    ],
    "npm:aurelia-history@1.0.0.js": [
      "npm:aurelia-history@1.0.0/aurelia-history"
    ],
    "npm:aurelia-loader-default@1.0.0.js": [
      "npm:aurelia-loader-default@1.0.0/aurelia-loader-default"
    ],
    "npm:aurelia-loader-default@1.0.0/aurelia-loader-default.js": [
      "aurelia-loader",
      "aurelia-pal",
      "aurelia-metadata"
    ],
    "npm:aurelia-templating-router@1.0.1.js": [
      "npm:aurelia-templating-router@1.0.1/aurelia-templating-router"
    ],
    "npm:aurelia-templating-router@1.0.1/aurelia-templating-router.js": [
      "aurelia-router",
      "./route-loader",
      "./router-view",
      "./route-href"
    ],
    "npm:aurelia-router@1.1.1.js": [
      "npm:aurelia-router@1.1.1/aurelia-router"
    ],
    "npm:aurelia-router@1.1.1/aurelia-router.js": [
      "aurelia-logging",
      "aurelia-route-recognizer",
      "aurelia-dependency-injection",
      "aurelia-history",
      "aurelia-event-aggregator"
    ],
    "npm:aurelia-route-recognizer@1.1.0.js": [
      "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer"
    ],
    "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer.js": [
      "aurelia-path"
    ],
    "npm:aurelia-templating-router@1.0.1/route-loader.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-router",
      "aurelia-path",
      "aurelia-metadata"
    ],
    "npm:aurelia-templating-router@1.0.1/route-href.js": [
      "aurelia-templating",
      "aurelia-dependency-injection",
      "aurelia-router",
      "aurelia-pal",
      "aurelia-logging"
    ],
    "npm:aurelia-templating-router@1.0.1/router-view.js": [
      "aurelia-dependency-injection",
      "aurelia-binding",
      "aurelia-templating",
      "aurelia-router",
      "aurelia-metadata",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.2.0.js": [
      "npm:aurelia-templating-resources@1.2.0/aurelia-templating-resources"
    ],
    "npm:aurelia-templating-resources@1.2.0/aurelia-templating-resources.js": [
      "./compose",
      "./if",
      "./with",
      "./repeat",
      "./show",
      "./hide",
      "./sanitize-html",
      "./replaceable",
      "./focus",
      "aurelia-templating",
      "./css-resource",
      "./html-sanitizer",
      "./attr-binding-behavior",
      "./binding-mode-behaviors",
      "./throttle-binding-behavior",
      "./debounce-binding-behavior",
      "./signal-binding-behavior",
      "./binding-signaler",
      "./update-trigger-binding-behavior",
      "./abstract-repeater",
      "./repeat-strategy-locator",
      "./html-resource-plugin",
      "./null-repeat-strategy",
      "./array-repeat-strategy",
      "./map-repeat-strategy",
      "./set-repeat-strategy",
      "./number-repeat-strategy",
      "./repeat-utilities",
      "./analyze-view-factory",
      "./aurelia-hide-style"
    ],
    "npm:aurelia-templating-resources@1.2.0/signal-binding-behavior.js": [
      "./binding-signaler"
    ],
    "npm:aurelia-templating-resources@1.2.0/repeat-strategy-locator.js": [
      "./null-repeat-strategy",
      "./array-repeat-strategy",
      "./map-repeat-strategy",
      "./set-repeat-strategy",
      "./number-repeat-strategy"
    ],
    "npm:aurelia-templating-resources@1.2.0/map-repeat-strategy.js": [
      "./repeat-utilities"
    ],
    "npm:aurelia-templating-resources@1.2.0/set-repeat-strategy.js": [
      "./repeat-utilities"
    ],
    "npm:aurelia-templating-resources@1.2.0/number-repeat-strategy.js": [
      "./repeat-utilities"
    ],
    "npm:aurelia-templating-resources@1.2.0/compose.js": [
      "aurelia-dependency-injection",
      "aurelia-task-queue",
      "aurelia-templating",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.2.0/if.js": [
      "aurelia-templating",
      "aurelia-dependency-injection"
    ],
    "npm:aurelia-templating-resources@1.2.0/repeat.js": [
      "aurelia-dependency-injection",
      "aurelia-binding",
      "aurelia-templating",
      "./repeat-strategy-locator",
      "./repeat-utilities",
      "./analyze-view-factory",
      "./abstract-repeater"
    ],
    "npm:aurelia-templating-resources@1.2.0/with.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.2.0/show.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-pal",
      "./aurelia-hide-style"
    ],
    "npm:aurelia-templating-resources@1.2.0/hide.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-pal",
      "./aurelia-hide-style"
    ],
    "npm:aurelia-templating-resources@1.2.0/sanitize-html.js": [
      "aurelia-binding",
      "aurelia-dependency-injection",
      "./html-sanitizer"
    ],
    "npm:aurelia-templating-resources@1.2.0/replaceable.js": [
      "aurelia-dependency-injection",
      "aurelia-templating"
    ],
    "npm:aurelia-templating-resources@1.2.0/focus.js": [
      "aurelia-templating",
      "aurelia-binding",
      "aurelia-dependency-injection",
      "aurelia-task-queue",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.2.0/css-resource.js": [
      "aurelia-templating",
      "aurelia-loader",
      "aurelia-dependency-injection",
      "aurelia-path",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.2.0/attr-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.2.0/binding-mode-behaviors.js": [
      "aurelia-binding",
      "aurelia-metadata"
    ],
    "npm:aurelia-templating-resources@1.2.0/debounce-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.2.0/throttle-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.2.0/binding-signaler.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.2.0/update-trigger-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.2.0/html-resource-plugin.js": [
      "aurelia-templating",
      "./dynamic-element"
    ],
    "npm:aurelia-templating-resources@1.2.0/array-repeat-strategy.js": [
      "./repeat-utilities",
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.2.0/repeat-utilities.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.2.0/aurelia-hide-style.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.2.0/dynamic-element.js": [
      "aurelia-templating"
    ],
    "npm:aurelia-polyfills@1.1.1.js": [
      "npm:aurelia-polyfills@1.1.1/aurelia-polyfills"
    ],
    "npm:aurelia-polyfills@1.1.1/aurelia-polyfills.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-templating-binding@1.2.0.js": [
      "npm:aurelia-templating-binding@1.2.0/aurelia-templating-binding"
    ],
    "npm:aurelia-templating-binding@1.2.0/aurelia-templating-binding.js": [
      "aurelia-logging",
      "aurelia-binding",
      "aurelia-templating"
    ],
    "npm:aurelia-animator-css@1.0.1.js": [
      "npm:aurelia-animator-css@1.0.1/aurelia-animator-css"
    ],
    "npm:aurelia-animator-css@1.0.1/aurelia-animator-css.js": [
      "aurelia-templating",
      "aurelia-pal"
    ],
    "npm:aurelia-fetch-client@1.1.0.js": [
      "npm:aurelia-fetch-client@1.1.0/aurelia-fetch-client"
    ],
    "npm:aurelia-bootstrapper@1.0.1.js": [
      "npm:aurelia-bootstrapper@1.0.1/aurelia-bootstrapper"
    ],
    "npm:aurelia-bootstrapper@1.0.1/aurelia-bootstrapper.js": [
      "aurelia-pal",
      "aurelia-pal-browser",
      "aurelia-polyfills"
    ],
    "npm:aurelia-pal-browser@1.1.0.js": [
      "npm:aurelia-pal-browser@1.1.0/aurelia-pal-browser"
    ],
    "npm:aurelia-pal-browser@1.1.0/aurelia-pal-browser.js": [
      "aurelia-pal"
    ]
  }
});