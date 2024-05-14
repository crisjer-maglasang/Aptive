class Collection {
  #items = [];
  #total = 0;

  constructor(items = [], total = null) {
    this.#items = items;
    this.#total = total ?? items.length;
  }

  get items() {
    return this.#items;
  }

  get total() {
    return this.#total;
  }

  toPlainObject() {
    return {
      total: this.#total,
      items: this.#items.map((item) => (
        typeof item.toPlainObject === 'function'
          ? item.toPlainObject()
          : item
      )),
    };
  }
}

export default Collection;
