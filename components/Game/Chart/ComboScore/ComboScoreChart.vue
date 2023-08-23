<template>
    <Line :data="data" :options="options" />
</template>

<script lang="ts">
import { useListGameScoreStore } from '@/store/game/listGameScore';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    components: {
        Line
    },
    data() {
        return {
            data: {
                labels: [],
                datasets: [
                    {
                        label: '',
                        backgroundColor: '',
                        borderColor: '',
                        data: [],
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            const store = useListGameScoreStore();
            const gameScoreList = store.listGameScore.items.list;

            var data = [];
            for (const game of gameScoreList) {
                data.push(game.game_combo_score);
            }

            this.data = {
                labels: [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [
                    {
                        label: 'combo',
                        backgroundColor: 'rgba(135,206,235,1)',
                        borderColor: 'rgba(135,206,235,0.3)',
                        data: data
                    }
                ]
            }
        }
    }
}
</script>
