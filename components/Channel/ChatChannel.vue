<template>
    <div>
        <NuxtLink ref="scrollLink" to="#scroll" href="#scroll"><!-- scrollで使用するダミー要素 --></NuxtLink>
        <div class="timeline">
            <v-card flat v-for="item in getListChat()" :key="item.chatKey" class="timeline-item">
                <v-row>
                    <v-col :cols="12" >
                        <div class="user-info">
                            <img class="user-icon" src="~/assets/images/sample_icon.png" alt="User Icon">
                            <div class="user-name">{{ item.userName }}</div>
                        </div>
                    </v-col>
                    <v-col :cols="12" >
                        <div class="timeline-content">
                            <div class="content-text">{{ item.content }}</div>
                        </div>                        
                    </v-col>
                </v-row>
                <div class="timeline-time">{{ item.posted_at }}</div>
            </v-card>
        </div>
        <div ref="scrollElement"><!-- scrollで使用するダミー要素 --></div>
        <div id="scroll"><!-- scrollで使用するダミー要素 --></div>
        <v-footer app class="bottom_nav">
            <v-row>
                <v-col cols="12">
                    <v-form class="form-container">
                        <v-textarea
                            color="primary"
                            label="Message"
                            class="align-end custom-textarea"
                            rows="1"
                            v-model="content"
                        ></v-textarea>
                        <v-btn color="primary" variant="tonal" class="send_button" @click="sendHandler()">
                            <v-icon class="send-icon">mdi-send</v-icon>
                        </v-btn>
                    </v-form>
                </v-col>  
            </v-row>
        </v-footer>        
    </div>
</template>

<script lang="ts">
import { FetchChat } from '@/domain/usecase/fetchChat';
import { useListChatStore } from '@/store/chat/listChat';
import { CreateChat } from "@/domain/entity/chat/createChat"
import { ListChat } from "@/domain/entity/chat/listChat"

import { useUserStore } from '@/store/user/user';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            content: "",
            userStore: useUserStore(),
            listChatStore: useListChatStore(),
        };
    },
    mounted() {
        this.listChatHandler().then(() => {
            this.scrollChat();
        })

        this.connectWebSocket()
    },
    watch: {
        '$route' () {
            if (this.websocket) {
                this.websocket.close();
            }
        }
    },
    methods: {
        // WebSocketサーバーに接続
        connectWebSocket() {
            const route = useRoute()
            const channelKey: string = route.params.channelKey;
            const config = useRuntimeConfig();
            const url = `${config.public.GcSocketUrl}/realtime/${channelKey}/send_chat`;

            // WebSocketサーバーに接続
            this.websocket = new WebSocket(url);
            this.websocket.onopen = () => {
                this.isConnected = true;
            };

            // メッセージを受信したときの処理
            this.websocket.onmessage = (event) => {
                if (this.checkElementVisibility()) {
                    this.listChatHandler().then(() => {
                        this.scrollChat();
                    })
                } else {
                    this.listChatHandler();
                }
            };

            // ソケットが閉じられたときの処理
            this.websocket.onclose = () => {
                this.isConnected = false;
            };
        },
        // チャット一覧を表示
        getListChat() {
            const chat = this.listChatStore.listChat.items.list
            const chatList = [];

            for (let i = 0; i < chat.length; i++) {
                chatList.push({
                    chatKey:   chat[i].chat_key,
                    userKey:   chat[i].user_key,
                    userName:  chat[i].user_name,
                    content:   chat[i].content,
                    posted_at: this.formatDateTime(chat[i].posted_at),
                });
            }

            return chatList;
        },
        formatDateTime(inputDateTime: string): string {
            const dateTime = new Date(inputDateTime);
            const year = dateTime.getFullYear();
            const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
            const day = dateTime.getDate().toString().padStart(2, "0");
            const hours = dateTime.getHours().toString().padStart(2, "0");
            const minutes = dateTime.getMinutes().toString().padStart(2, "0");

            return `${year}/${month}/${day}/${hours}:${minutes}`;
        },
        // チャット一覧を取得
        async listChatHandler() {
            try {
                const route = useRoute();
                const channelKey: string = route.params.channelKey;
                const userKey: string = this.userStore.user.items.user_key;

                const fetchChat = new FetchChat(ApiClient);
                const chatList: ListChat = await fetchChat.listChat(userKey, channelKey);

                await this.listChatStore.update(chatList);
            } catch (error) {}
        },
        // チャットを送信
        async sendHandler() {
            if (this.websocket) {
                const userKey: string = this.userStore.user.items.user_key
                const access_token = useCookie('access_token')

                const messageObject = {
                    user_key: userKey,
                    token: access_token.value,
                    content: this.content,
                };
                
                const jsonMessage = JSON.stringify(messageObject);
                this.websocket.send(jsonMessage);
            }

            await this.listChatHandler();
            await this.getListChat();
            
            this.content ="";
            this.scrollChat();
        },
        // scroll
        scrollChat() {
            try {
                this.$refs.scrollLink.$el.click();
            } catch (error) {}
        },
        // scroll位置を判定
        checkElementVisibility() {
            const element = this.$refs.scrollElement;
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

            const result: boolean = false
            if (isVisible) {
                return true;
            }

            return result
        },
    }
};
</script>

<style lang="scss" scoped>
.timeline {
    overflow: scroll;
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
    height: 56px;
}

.send-icon {
    font-size: 30px;
}

.custom-textarea {
    height: 30px;
}
</style>
