
/**
 * @param {number} numberOfPeople
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (numberOfPeople, dislikes) {
    const offset = numberOfPeople;
    this.parent = Array.from(Array(numberOfPeople + offset + 1).keys());
    this.rank = new Array(numberOfPeople + offset + 1).fill(0);

    for (let pairDislike of dislikes) {
        union(pairDislike[0], (pairDislike[1] + offset));
        union(pairDislike[1], (pairDislike[0] + offset));
    }

    for (let person = 1; person <= numberOfPeople; person++) {
        if (findParent(person) === findParent(person + offset)) {
            return false;
        }
    }
    return true;
};

/**
 * @param {number} index
 * @return {number}
 */
function findParent(index) {
    if (this.parent[index] !== index) {
        this.parent[index] = findParent(this.parent[index]);
    }
    return this.parent[index];
}

/**
 * @param {number} first
 * @param {number} second
 * @return {void}
 */
function union(first, second) {
    const parentFirst = findParent(first);
    const parentSecond = findParent(second);
    if (parentFirst !== parentSecond) {
        joinByRank(parentFirst, parentSecond);
    }
}

/**
 * @param {number} first
 * @param {number} second
 * @return {void}
 */
function joinByRank(first, second) {
    if (this.rank[first] >= this.rank[second]) {
        this.parent[second] = first;
        this.rank[first]++;
    } else {
        this.parent[first] = second;
        this.rank[second]++;
    }
}
