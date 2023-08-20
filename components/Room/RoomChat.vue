<template>
    <div>
        <NuxtLink ref="scrollLink" to="#scroll" href="#scroll"><!-- scrollで使用するダミー要素 --></NuxtLink>
        <div v-for="item in getListRoomChat().reverse()" :key="item.roomChatKey">
            <v-row v-if="item.myPost" justify="end" class="timeline">
                <v-card flat :key="item.roomChatKey" class="timeline_item">
                    <v-row>
                        <v-col :cols="12">
                            <div class="user_info">
                                <img class="user_icon" :src="item.userImagePath" alt="UserIcon">
                                <div class="user_name">{{ item.userName }}</div>
                                <div class="posted_at">{{ item.posted_at }}</div>
                            </div>
                        </v-col>
                        <v-col :cols="12" >
                            <div class="timeline_content">
                                <div class="content_text">{{ item.content }}</div>
                            </div>
                            <div v-if="item.roomChatImagePath != null">
                                <img class="chat_image" :src="item.roomChatImagePath">
                            </div>
                        </v-col>
                    </v-row>
                </v-card> 
            </v-row>
            <v-row v-else class="timeline">
                <v-card flat :key="item.chatKey" class="timeline_item">
                    <v-row>
                        <v-col :cols="12">
                            <div class="user_info">
                                <img class="user_icon" :src="item.userImagePath" alt="UserIcon">
                                <div class="user_name">{{ item.userName }}</div>
                                <div class="posted_at">{{ item.posted_at }}</div>
                            </div>
                        </v-col>
                        <v-col :cols="12" >
                            <div class="timeline_content">
                                <div class="content_text">{{ item.content }}</div>
                            </div>
                            <div v-if="item.roomChatImagePath != null">
                                <img class="chat_image" :src="item.roomChatImagePath">
                            </div>
                        </v-col>
                    </v-row>
                </v-card> 
            </v-row>  
        </div>
        <div id="scroll"><!-- scrollで使用するダミー要素 --></div>
        <div ref="scrollElement"><!-- scrollで使用するダミー要素 --></div>
        <v-footer app class="bottom_nav">
            <v-row>
                <v-col cols="12">
                    <v-form class="form-container">
                        <v-textarea
                            color="primary"
                            label="Message"
                            class="align-end custom_textarea send_form"
                            rows="1"
                            v-model="content"
                        ></v-textarea>
                        <v-btn flat icon class="upload_image_button" @click="openImageUploadDialog">
                            <v-icon class="send_icon">mdi-paperclip</v-icon>
                        </v-btn>
                        <v-btn color="primary" variant="tonal" class="send_button" @click="sendHandler()">
                            <v-icon class="send_icon">mdi-send</v-icon>
                        </v-btn>
                    </v-form>
                </v-col>  
            </v-row>
        </v-footer>        
    </div>
</template>

<script lang="ts">
import { FetchRoomChat } from '@/domain/usecase/fetchRoomChat';
import { useListRoomChatStore } from '@/store/roomChat/listRoomChat';
import { ListRoomChat } from "@/domain/entity/roomChat/listRoomChat"

import { useUserStore } from '@/store/user/user';
import ApiClient from '@/infra/api/apiClient';

export default {
    data() {
        return {
            content: "",
            roomChatImage: null as File | null,
            userStore: useUserStore(),
            listRoomChatStore: useListRoomChatStore(),
        };
    },
    mounted() {
        this.listRoomChatHandler().then(() => {
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
        async encodeImage(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        },
        async openImageUploadDialog() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.addEventListener('change', this.handleImageUpload);
            input.click();
        },
        // 選択された画像ファイルを処理
        async handleImageUpload(event) {
            const file = event.target.files[0];
            const encodedImage = await this.encodeImage(file);
            this.roomChatImage = encodedImage.replace(/^data:image\/\w+;base64,/, '');
        },
        // WebSocketサーバーに接続
        async connectWebSocket() {
            const route = useRoute();
            const roomKey: string = route.params.roomKey;
            const config = useRuntimeConfig();
            const url = `${config.public.GcSocketUrl}/realtime/${roomKey}/send_room_chat`;

            // WebSocketサーバーに接続
            this.websocket = new WebSocket(url);
            this.websocket.onopen = () => {
                this.isConnected = true;
            };

            // メッセージを受信したときの処理
            this.websocket.onmessage = (event) => {
                if (this.checkElementVisibility()) {
                    this.listRoomChatHandler().then(() => {
                        this.scrollChat();
                    })
                } else {
                    this.listRoomChatHandler();
                }
            };

            // ソケットが閉じられたときの処理
            this.websocket.onclose = () => {
                this.isConnected = false;
            };
        },
        // チャット一覧を表示
        getListRoomChat() {
            const chat = this.listRoomChatStore.listRoomChat.items.list
            const chatList = [];

            const config = useRuntimeConfig();

            for (let i = 0; i < chat.length; i++) {
                var roomChatImagePath = "";
                if (chat[i].image_path != "") {
                    roomChatImagePath = `${config.public.GcImageUrl}/image/get?image_path=static/images/create_room_chat/${chat[i].room_chat_key}.png`
                }

                var myPost = false;
                const userKey = this.userStore.user.items.user_key;
                if (chat[i].user_key == userKey) {
                    myPost = true
                }

                chatList.push({
                    roomChatKey:       chat[i].room_chat_key,
                    userKey:           chat[i].user_key,
                    userName:          chat[i].user_name,
                    content:           chat[i].content,
                    userImagePath:     `${config.public.GcImageUrl}/image/get?image_path=static/images/user/${chat[i].user_key}.png`,
                    roomChatImagePath: roomChatImagePath,
                    posted_at:         this.formatDateTime(chat[i].posted_at),
                    myPost:            myPost,
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
        async listRoomChatHandler() {
            try {
                const route = useRoute();
                const roomKey: string = route.params.roomKey;
                const userKey: string = this.userStore.user.items.user_key;

                const fetchRoomChat = new FetchRoomChat(ApiClient);
                const roomChatList: ListRoomChat = await fetchRoomChat.listRoomChat(userKey, roomKey);

                await this.listRoomChatStore.update(roomChatList);
            } catch (error) {}

            await new Promise((resolve) => setTimeout(resolve, 500));
        },
        // チャットを送信
        async sendHandler() {
            if (this.websocket) {
                const userKey: string = this.userStore.user.items.user_key
                const access_token = useCookie('access_token')

                const messageObject = {
                    user_key:        userKey,
                    token:           access_token.value,
                    content:         this.content,
                    room_chat_image: this.roomChatImage,
                };
                
                const jsonMessage = JSON.stringify(messageObject);
                this.websocket.send(jsonMessage);
            }

            this.content = "";
            this.roomChatImage = null as File | null;
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
    margin-top: 20px;
}

.timeline_item {
    max-width: 770px;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
}

.user_info {
    display: flex;
    align-items: center;
}

.user_icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
}

.user_name {
    font-weight: bold;
}

.posted_at {
    margin-left: 20px;
}

.timeline_content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.content_text {
    margin-top: 5px;
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

.send_icon {
    font-size: 30px;
}

.custom_textarea {
    height: 30px;
}

.send_form {
    width: 50%;
}

.upload_image_button {
    color: #6200EE;
}

.chat_image {
    width: 100%;
}
</style>
