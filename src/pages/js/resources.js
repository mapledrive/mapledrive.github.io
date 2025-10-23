export class Resources {
  constructor() {
    this.cache = new Map(); // URL → HTMLImageElement
    this.loadingPromises = new Map(); // URL → Promise
  }

  load(url) {
    if (this.cache.has(url)) {
      return Promise.resolve(this.cache.get(url));
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(url, img);
        this.loadingPromises.delete(url);
        resolve(img);
      };
      img.onerror = () => {
        this.loadingPromises.delete(url);
        reject(new Error(`Failed to load: ${url}`));
      };
      img.src = url;
    });

    this.loadingPromises.set(url, promise);
    return promise;
  }

  get(url) {
    return this.cache.get(url);
  }

  loadAll(urls) {
    return Promise.all(urls.map(url => this.load(url)));
  }
}

export const resources = new Resources();

export const loadAllSprites = () => {
  return resources.loadAll([
    '/player.png',
    '/enemy.png',
    '/tiles.png',
    '/playerl.png',
    '/items.png',
    '/enemyr.png',
  ]);
};
