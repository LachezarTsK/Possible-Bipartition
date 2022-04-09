
import java.util.stream.IntStream;

class Solution {

    private int[] parent;
    private int[] rank;

    public boolean possibleBipartition(int numberOfPeople, int[][] dislikes) {
        final int offset = numberOfPeople;
        parent = IntStream.rangeClosed(0, (numberOfPeople + offset)).toArray();
        rank = new int[numberOfPeople + offset + 1];

        for (int[] pairDislike : dislikes) {
            union(pairDislike[0], (pairDislike[1] + offset));
            union(pairDislike[1], (pairDislike[0] + offset));
        }

        for (int person = 1; person <= numberOfPeople; person++) {
            if (findParent(person) == findParent(person + offset)) {
                return false;
            }
        }
        return true;
    }

    private int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    private void union(int first, int second) {
        int parentFirst = findParent(first);
        int parentSecond = findParent(second);
        if (parentFirst != parentSecond) {
            joinByRank(parentFirst, parentSecond);
        }
    }

    private void joinByRank(int first, int second) {
        if (rank[first] >= rank[second]) {
            parent[second] = first;
            rank[first]++;
        } else {
            parent[first] = second;
            rank[second]++;
        }
    }
}
