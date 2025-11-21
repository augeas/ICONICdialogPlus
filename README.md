![](https://byob.yarr.is/RubbaBoy/Example/time)

# ICONICdialogPlus

This is a proof-of-concept adaptation of [Dialog+](https://en.wikipedia.org/wiki/Dialog%2B) for
people with learning disabilities for the [ICONIC programme](https://www.qmul.ac.uk/iconic-programme/).
It is currently realised as a [progressive web application](https://en.wikipedia.org/wiki/Progressive_web_app)
(PWA) via [React Native for Web](https://necolas.github.io/react-native-web/) and [Expo](https://expo.dev/). All user
data is kept in the browser's local storage via [Zustand](https://zustand.docs.pmnd.rs).

## Please Note:

* This app makes no http requests containing user data whatsoever.
* All data remains within the device's browser, until exported.
* If used in a clinical setting, *you* are responsible for:
    - Using a work-appropriate and secure device.
    - Storing or tranfering any exported data safely and appropriately.
    - Deleting any data stored on the device, including uninstalling the app in a timely manner.
* The warranty of this software, according to its [license](https://www.apache.org/licenses/LICENSE-2.0), is NONE WHATSOEVER.

## Getting Started:

Having cloned the repo, install the depencies and start Expo:

```bash
cd dialogPlus
npm install
npx expo start
```

The app should be visible at `localhost:8081`. If using a Chrome/Chromium-based browser, the option to install
it as a PWA should be visible in the address bar. Firefox will require an [extension](https://addons.mozilla.org/en-GB/firefox/addon/pwas-for-firefox/).

## Deploying the App:

In order to deploy the app as a PWA, we need to follow the [directions](https://docs.expo.dev/guides/progressive-web-apps/)
specified by Expo. [Workbox-cli](https://developer.chrome.com/docs/workbox/modules/workbox-cli/) is used as a 
service worker, and the app is exported as a [static-build](https://docs.expo.dev/router/web/static-rendering/):

```bash
./build_pwa.sh
npx expo serve
```
To finally deploy the app, you need to serve the static content in `dialogPlus/dist` with your regular
web-server, or one of the [options supported by Expo](https://docs.expo.dev/guides/publishing-websites/). 
To test this via [Python](https://docs.python.org/3/library/http.server.html) you might try:

```bash
cd dist
python3 -m http.server
```

## Managing Domains, Questions, Prompts and Images:

Dialog+ involves asking a series of questions over a set of life domains and treatment aspects. To modify these
as defined in the app:

* Set `DomainTitles` and the corresponding `DomainPrompts` and `DomainImageURI`s within `dialogPlus/data/assessments.ts`.
* For each of the `Domains`, set arrays of prompts in `QuestionPrompts` and further example bullet-points in `QuestionIncludes` within `dialogPlus/data/questionPrompts.ts`.
* For question prompt and example bullet-point, set a `QuestionImageURI` and `PromptImageURI`s in `dialogPlus/data/promptImages.ts`.
* Ensure all the images are present in `dialogPlus/assets/images/domains/` and `dialogPlus/dialogPlus/assets/images/prompts/`.
