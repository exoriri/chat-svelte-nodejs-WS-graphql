<script lang="ts">
  import { onMount } from "svelte";
  import { sendMessage, Asyncchats, Asyncchat } from "src/generated";
  import Avatar from "./Avatar.svelte";
  import Button from "./Button.svelte";
  import sendIcon from "../../assets/send-icon.svg";
  import UserHeader from "./UserHeader.svelte";
  import ChatCard from "./ChatCard.svelte";
  import { user, chat } from "src/stores";

  export let isUserHeader = false;

  let message = "";
  $: userChats = [];
  $: loading = true;
  $: errorMessage = "";
  $: selectedChat = $chat.selectedChat;

  onMount(async () => {
    const { data } = await Asyncchats({});
    if (data.chats.__typename === "ChatsResult") {
      userChats = data.chats.result;
      chat.update((prevState) => ({
        ...prevState,
        selectedChat: data.chats.result[0],
      }));
    } else {
      console.log(data.chats.message, "ERROR");
      errorMessage = data.chats.message;
    }
    loading = false;
  });

  const selectChat = async (id: number) => {
    chat.update((prevState) => ({ ...prevState, loadingSelectedChat: true }));

    const { data } = await Asyncchat({ variables: { chat_id: id.toString() } });

    if (data.chat.__typename === "Chat") {
      chat.update(() => ({
        selectedChat: data.chat,
        loadingSelectedChat: false,
      }));
    } else {
      console.log(data.chat.message, "ERROR");
      chat.update((prevState) => ({
        ...prevState,
        loadingSelectedChat: false,
      }));
    }
  };

  const onSend = async () => {
    await sendMessage({
      variables: {
        chat_id: $chat.selectedChat.id,
        content: message,
      },
    });
    message = "";
  };

  const logout = () => {
    user.update(() => null);
    localStorage.removeItem("user");
  };
</script>

<div>
  {#if loading}
    <div>loading...</div>
  {:else}
    {#if isUserHeader}
      <UserHeader
        avatarImageUrl={$user?.avatar_url}
        userName={$user?.fullname}
        on:logout={logout}
      />
    {/if}
    <div class="body-layout">
      <div class="body-layout__side-chats">
        <div class="body-layout__card-wrapper">
          {#if errorMessage.length > 0}
            <div>asdfasdfa</div>
          {:else}
            {#each userChats as chat}
              <Button
                class="body-layout__card-btn"
                on:click={() => selectChat(chat.id)}
              >
                <div class="body-layout__card">
                  <ChatCard
                    active={selectedChat.id === chat.id}
                    avatarUrl={chat.user.avatar_url}
                    titleName={chat.user.fullname}
                    messageText={chat.messages[chat.messages.length - 1]
                      .content}
                  />
                </div>
              </Button>
            {/each}
          {/if}
        </div>
      </div>
      <div class="body-layout__chat">
        <slot />
        <footer class="footer">
          <input
            bind:value={message}
            placeholder="type smth here..."
            class="footer__input"
            type="text"
          />
          <Button on:click={onSend} class="footer__btn">
            <span class="footer__btn-text"> Отправить </span>
            <img src={sendIcon} alt="send" />
          </Button>
        </footer>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 20px;
    padding: 15px 20px;

    &__title {
      font-family: "Roboto-Regular";
      font-size: 1.875rem;
      color: #000;
      margin-left: 20px;
    }
  }

  .body-layout {
    display: flex;
    max-height: 100vh;
    &__chat {
      flex: 0.65;
    }

    :global(.body-layout__card-btn) {
      width: 100%;
    }

    &__side-chats {
      flex: 0.35;
      margin-right: 10px;
      overflow-y: scroll;
      height: 100vh;

      &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: lightgrey;
      }
      &::-webkit-scrollbar {
        width: 5px;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: var(--primary-color);
      }
      &::-webkit-scrollbar-track-piece:end {
        background: transparent;
      }
    }

    &__card-wrapper {
      margin-right: 10px;
      height: 100%;
    }

    &__card {
      margin-bottom: 20px;
      border-radius: 15px;
    }
  }

  .footer {
    display: flex;
    background: #fff;
    width: 100%;
    border-radius: 20px;
    padding: 15px 20px;
    box-sizing: border-box;
    margin-top: 27px;
    box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.25);

    :global(.footer__btn) {
      display: flex;
      align-items: center;
      margin-left: auto;
      border-radius: 20px;
      padding: 15px 20px;
      background: var(--primary-color-dim);
    }

    &__btn-text {
      font-family: "Roboto-Regular";
      font-size: 1.375rem;
      color: #fff;
      margin-right: 15px;
    }

    &__input {
      border: none;
      outline: none;
      font-family: "Roboto-Regular";
      font-size: 1.25rem;
      flex: 1;
      margin-right: 30px;

      &::placeholder {
        color: #aeaeae;
      }
    }
  }
</style>
