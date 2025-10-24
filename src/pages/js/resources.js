export class ResourceLoader {
  constructor() {
    this.resourceCache = {};
    this.loading = [];
    this.readyCallbacks = [];
  }

  // Load an image url or an array of image urls
  load(urlOrArr) {
    if (urlOrArr instanceof Array) {
      urlOrArr.forEach(url => {
        this._load(url);
      });
    } else {
      this._load(urlOrArr);
    }
  }

  _load(url) {
    if (this.resourceCache[url]) {
      return this.resourceCache[url];
    } else {
      var img = new Image();
      img.onload = () => {
        this.resourceCache[url] = img;

        if (this.isReady()) {
          this.readyCallbacks.forEach(func => {
            func();
          });
        }
      };
      this.resourceCache[url] = false;
      img.src = url;
    }
  }

  get(url) {
    return this.resourceCache[url];
  }

  isReady() {
    var ready = true;
    for (var k in this.resourceCache) {
      if (this.resourceCache.hasOwnProperty(k) && !this.resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  onReady(func) {
    this.readyCallbacks.push(func);
  }
}
