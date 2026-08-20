import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';

import Spinner from '../components/Spinner.js';

export default {
    components: {
        Spinner,
    },
    data: () => ({
        leaderboard: [],
        loading: true,
        selected: 0,
        err: [],
    }),
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">
                <div class="error-container">
                    <p class="error" v-if="err.length > 0">
                        Leaderboard may be incorrect, as the following levels could not be loaded: {{ err.join(', ') }}
                    </p>
                </div>
                <div class="board-container">
                    <table class="board">
                        <tr v-for="(ientry, i) in leaderboard">
                            <td class="rank">
                                <p class="type-label-lg">#{{ i + 1 }}</p>
                            </td>
                            <td class="total">
                                <p class="type-label-lg">{{ localize(ientry.total) }}</p>
                            </td>
                            <td class="user" :class="{ 'active': selected == i }">
                                <button @click="selected = i">
                                    <span class="type-label-lg">{{ ientry.user }}</span>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="player-container">
                    <div class="player">
                        <h1>#{{ selected + 1 }} {{ entry.user }}</h1>
                        <h3>{{ entry.total }}</h3>
                        <h2 v-if="entry.verified.length > 0">Verified ({{ entry.verified.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.verified">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" class="level" :class="{ 
                        'amethyst': score.rank <= 2 , 
                        'pearl': (score.rank >= 3) && (score.rank <= 8) , 
                        'diamond': (score.rank >= 9) && (score.rank <= 21) , 
                        'ruby': (score.rank >= 22) && (score.rank <= 54) , 
                        'emerald': (score.rank >= 55) && (score.rank <= 86) , 
                        'jade': (score.rank >= 87) && (score.rank <= 108) , 
                        'malachite': (score.rank >= 109) && (score.rank <= 123) , 
                        'osmium': (score.rank >= 124) && (score.rank <= 140) ,
                        'sapphire': (score.rank >= 141) && (score.rank <= 168) , 
                        'titanium': (score.rank >= 169) && (score.rank <= 181) ,
                        'platinum': (score.rank >= 182) && (score.rank <= 204) , 
                        'amber': (score.rank >= 205) && (score.rank <= 238) , 
                        'gold': (score.rank >= 239) && (score.rank <= 268) , 
                        'silver': (score.rank >= 269) && (score.rank <= 295) , 
                        'bronze': (score.rank >= 296) && (score.rank <= 324) , 
                        'beginner': (score.rank >= 325) && (score.rank <= 354) , 
                        'wood': (score.rank >= 355)}"  target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.completed.length > 0">Completed ({{ entry.completed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.completed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" class="level" :class="{ 
                        'amethyst': score.rank <= 2 , 
                        'pearl': (score.rank >= 3) && (score.rank <= 8) , 
                        'diamond': (score.rank >= 9) && (score.rank <= 21) , 
                        'ruby': (score.rank >= 22) && (score.rank <= 54) , 
                        'emerald': (score.rank >= 55) && (score.rank <= 86) , 
                        'jade': (score.rank >= 87) && (score.rank <= 108) , 
                        'malachite': (score.rank >= 109) && (score.rank <= 123) , 
                        'osmium': (score.rank >= 124) && (score.rank <= 140) ,
                        'sapphire': (score.rank >= 141) && (score.rank <= 168) , 
                        'titanium': (score.rank >= 169) && (score.rank <= 181) ,
                        'platinum': (score.rank >= 182) && (score.rank <= 204) , 
                        'amber': (score.rank >= 205) && (score.rank <= 238) , 
                        'gold': (score.rank >= 239) && (score.rank <= 268) , 
                        'silver': (score.rank >= 269) && (score.rank <= 295) , 
                        'bronze': (score.rank >= 296) && (score.rank <= 324) , 
                        'beginner': (score.rank >= 325) && (score.rank <= 354) , 
                        'wood': (score.rank >= 355)}"  target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.progressed.length > 0">Progressed ({{entry.progressed.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.progressed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" class="level" :class="{ 
                        'amethyst': score.rank <= 10 , 
                        'pearl': (score.rank >= 11) && (score.rank <= 20) , 
                        'diamond': (score.rank >= 21) && (score.rank <= 30) , 
                        'ruby': (score.rank >= 31) && (score.rank <= 40) , 
                        'emerald': (score.rank >= 41) && (score.rank <= 50) , 
                        'jade': (score.rank >= 51) && (score.rank <= 60) , 
                        'malachite': (score.rank >= 61) && (score.rank <= 70) , 
                        'osmium': (score.rank >= 71) && (score.rank <= 80) ,
                        'sapphire': (score.rank >= 81) && (score.rank <= 90) , 
                        'titanium': (score.rank >= 91) && (score.rank <= 100) ,
                        'platinum': (score.rank >= 101) && (score.rank <= 110) , 
                        'amber': (score.rank >= 111) && (score.rank <= 120) , 
                        'gold': (score.rank >= 121) && (score.rank <= 130) , 
                        'silver': (score.rank >= 131) && (score.rank <= 140) , 
                        'bronze': (score.rank >= 141) && (score.rank <= 150) , 
                        'beginner': (score.rank >= 151) && (score.rank <= 160) , 
                        'wood': (score.rank >= 161)}" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    `,
    computed: {
        entry() {
            return this.leaderboard[this.selected];
        },
    },
    async mounted() {
        const [leaderboard, err] = await fetchLeaderboard();
        this.leaderboard = leaderboard;
        this.err = err;
        // Hide loading spinner
        this.loading = false;
    },
    methods: {
        localize,
    },
};
