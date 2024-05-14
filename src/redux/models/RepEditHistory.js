class RepEditHistory {
  #itemChanged;
  #changedFrom;
  #changedTo;
  #changedBy;
  #changedAt;

  constructor({
    itemChanged,
    changedFrom,
    changedTo,
    changedBy,
    changedAt,
  }) {
    this.#itemChanged = itemChanged;
    this.#changedFrom = changedFrom;
    this.#changedTo = changedTo;
    this.#changedBy = changedBy;
    this.#changedAt = changedAt;
  }

  get itemChanged() {
    return this.#itemChanged;
  }

  get changedFrom() {
    return this.#changedFrom;
  }

  get changedTo() {
    return this.#changedTo;
  }

  get changedBy() {
    return this.#changedBy;
  }

  get changedAt() {
    return this.#changedAt;
  }

  toPlainObject() {
    return {
      itemChanged: this.#itemChanged,
      changedFrom: this.#changedFrom,
      changedTo: this.#changedTo,
      changedBy: this.#changedBy,
      changedAt: this.#changedAt,
    };
  }
}

export default RepEditHistory;
