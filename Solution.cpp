
#include <numeric>
#include <vector>
using namespace std;

class Solution {
    
    vector<int> parent;
    vector<int> rank;

public:

    bool possibleBipartition(int numberOfPeople, vector<vector<int>>&dislikes) {
        const int offset = numberOfPeople;
        parent.resize(numberOfPeople + offset + 1);
        iota(parent.begin(), parent.end(), 0);
        rank.resize(numberOfPeople + offset + 1);

        for (const auto& pairDislike : dislikes) {
            doUnion(pairDislike[0], (pairDislike[1] + offset));
            doUnion(pairDislike[1], (pairDislike[0] + offset));
        }

        for (int person = 1; person <= numberOfPeople; person++) {
            if (findParent(person) == findParent(person + offset)) {
                return false;
            }
        }
        return true;
    }
    
private:
    
    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    void doUnion(int first, int second) {
        int parentFirst = findParent(first);
        int parentSecond = findParent(second);
        if (parentFirst != parentSecond) {
            joinByRank(parentFirst, parentSecond);
        }
    }

    void joinByRank(int first, int second) {
        if (rank[first] >= rank[second]) {
            parent[second] = first;
            rank[first]++;
        } else {
            parent[first] = second;
            rank[second]++;
        }
    }
};
