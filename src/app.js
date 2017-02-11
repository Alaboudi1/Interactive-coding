import { inject } from 'aurelia-framework';
import { Run } from './servicesBootstrapper/run';
@inject(Run)
export class App {
  constructor() {}
}
