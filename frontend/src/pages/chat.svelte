<script>
  import { newMessage } from "src/generated";
  import { user, chat } from "src/stores";
  import ChatLayout from "../lib/components/ChatLayout.svelte";
  import MessagesList from "src/lib/components/MessagesList.svelte";

  let previousChatId = $chat.selectedChat?.id;
  $: subscribedMessages = [];
  $: previousChatId !== $chat.selectedChat?.id && messageSubscribe() && clearSubscribedMessages();

  const clearSubscribedMessages = () => {
    subscribedMessages = [];
  }

  const messageSubscribe = async () => {
    const reply = newMessage({ variables: {chat_id: $chat.selectedChat.id} });
    previousChatId = $chat.selectedChat.id
    reply.subscribe(({ data }) => {
      if (data.newMessage.__typename !== "Error") {
        const dublSubscribedMessages = [...subscribedMessages];
        const foundMessageIndex = dublSubscribedMessages.findIndex(message => message.id === data.newMessage.id);

        if (foundMessageIndex === -1) {
          dublSubscribedMessages.push(data.newMessage);
        }

        subscribedMessages = dublSubscribedMessages;
      }
    });
  };

</script>

<div class="chat-wrapper">
  <ChatLayout isUserHeader>
    <div class="chat">
      {#if $chat.selectedChat !== null} 
      <MessagesList
        user={$user} 
        messages={$chat.selectedChat.messages}
      />
      {/if}
      <MessagesList
        user={$user} 
        messages={subscribedMessages}
      />
      <!-- <Message avatarImageUrl={imageUrl} text="Прикинь, что вчера было..." />
      <Message text="Ну, давай, рассказывай. Я готов:))" />
      <Message
        avatarImageUrl={imageUrl}
        text="Рассказываю. Крч, пошла я вчера с подругами гулять...
          На Думскую... Через час устала и уехала домой спать. 
          И знаешь что?"
      />
      <Message text="Что?" />
      <Message
        avatarImageUrl={imageUrl}
        text="И блин. Не знаю как, но я проснулась в Испании. Без денег. Сможешь 
          занять на билет обратно?:(("
      />
      <Message text="Я бы с радостью, но у нас же переводы заблокированы" />
      <Message avatarImageUrl={imageUrl} text="Капец..." /> -->
    </div>
  </ChatLayout>
</div>

<style lang="scss">
  .chat-wrapper {
    padding: 20px;
    position: relative;
    height: 100%;
  }

  .chat {
    height: calc(
      100vh - var(--footer-margin) - var(--footer-height) * 2 -
        var(--chat-inner-margin)
    );
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    overflow-y: scroll;
    box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: .25);

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  @media screen and (max-width: 1024px) {
    .chat-wrapper {
      width: 95%;
    }
  }
</style>
