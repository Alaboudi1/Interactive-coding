export class resultValueConverter {
  toView(result) {
    return JSON.stringify(result);
  }
  fromView(result) {
    return JSON.parse(result);
  }
}
