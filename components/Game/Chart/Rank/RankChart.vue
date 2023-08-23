<template>
    <Line :data="data" :options="options" />
</template>

<script lang="ts">
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
                        label: 'rank',
                        backgroundColor: 'rgba(135,206,235,1)',
                        borderColor: 'rgba(135,206,235,0.3)',
                        data: []
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
            this.data = {
                labels: [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [
                    {
                        label: 'rank',
                        backgroundColor: 'rgba(135,206,235,1)',
                        borderColor: 'rgba(135,206,235,0.3)',
                        data: [40, 39, 10, 40, 39, 80, 40]
                    }
                ]
            };

            this.options = {
                responsive: true,
                maintainAspectRatio: false
            };
        }
    }
}
</script>
