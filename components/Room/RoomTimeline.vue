<template>
    <div>
        <div class="timeline">
            <v-card flat v-for="item in items" :key="item.id" class="timeline-item">
                <v-row>
                    <v-col :cols="12" >
                        <div class="user-info">
                            <img class="user-icon" src="~/assets/images/sample_icon.png" alt="User Icon">
                            <div class="user-name">{{ item.userName }}</div>
                        </div>
                    </v-col>
                    <v-col :cols="12" >
                        <div class="timeline-content">
                            <div class="content-text">{{ item.text }}</div>
                        </div>                        
                    </v-col>
                </v-row>
                <div class="timeline-time">{{ item.time }}</div>
            </v-card>
        </div>
        <v-footer app class="bottom_nav">
            <v-row>
                <v-col cols="12">
                    <v-form class="form-container">
                        <v-textarea
                            color="primary"
                            label="Message"
                            class="align-end custom-textarea"
                            rows="1"
                        ></v-textarea>
                        <v-btn color="primary" variant="tonal" class="send_button">
                            <v-icon class="send-icon">mdi-send</v-icon>
                        </v-btn>
                    </v-form>
                </v-col>  
            </v-row>
        </v-footer>        
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            items: [
                { id: 1, text: 'Hello!', time: '10:00 AM', userName: 'User1' },
                { id: 2, text: 'How are you?', time: '10:15 AM', userName: 'User2' },
                { id: 2, text: 'How are you?', time: '10:15 AM', userName: 'User2' },
                { id: 2, text: 'How are you?', time: '10:15 AM', userName: 'User2' },
                { id: 2, text: 'How are you?', time: '10:15 AM', userName: 'User2' },
                { id: 2, text: 'How are you?', time: '10:15 AM', userName: 'User2' },
                { id: 2, text: 'How are you?', time: '10:15 AM', userName: 'User2' },
                { id: 2, text: 'How are you?', time: '10:15 AM', userName: 'User2' },
                { id: 2, text: 'How are you?', time: '10:15 AM', userName: 'User2' },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.timeline {
    display: flex;
    flex-direction: column-reverse;
}

.timeline-item {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
}

.user-info {
    display: flex;
    align-items: center;
}

.user-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-name {
    font-weight: bold;
}

.timeline-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.content-text {
    margin-top: 5px;
}

.timeline-time {
    color: #999;
}

.bottom_nav {
    box-shadow: none !important;
}

.form-container {
    display: flex;
    align-items: flex-start;
}

.send_button {
    align-self: flex-start;
    height: 58px;
}

.send-icon {
    font-size: 30px;
}

.custom-textarea {
    height: 30px;
}
</style>
