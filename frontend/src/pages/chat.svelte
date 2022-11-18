<script>
  import { newMessage } from "src/generated";
  import { user } from "src/stores";
  import { each } from "svelte/internal";
  import ChatLayout from "../lib/components/ChatLayout.svelte";
  import Message from "../lib/components/Message.svelte";

  const imageUrl = "images/girl-face.png";
  const name = "Пантера Пантеровна";

  $: subscribedMessages = [];

  const messageSubscribe = async () => {
    const reply = newMessage({});

    reply.subscribe(({ data }) => {
      if (data.newMessage.__typename !== "Error") {
        const dublSubscribedMessages = [...subscribedMessages];
        dublSubscribedMessages.push(data.newMessage);
        subscribedMessages = dublSubscribedMessages;
      }
    });
  };

  messageSubscribe();
</script>

<div class="chat-wrapper">
  <ChatLayout isUserHeader {name} {imageUrl}>
    <div class="chat">
      {#each subscribedMessages as message}
        {#if $user.id === message.user.id}
          <Message text={message.content} />
        {:else}
          <Message avatarImageUrl={message.user.avatar_url} text={message.content} />
        {/if}
      {/each}
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
    width: 65%;
    margin: 0 auto;
    padding: 20px 0;
    position: relative;
    height: 100%;
  }

  .chat {
    height: calc(
      100vh - var(--footer-margin) - var(--footer-height) * 2 -
        var(--chat-inner-margin) - 25px
    );
    background: #fff;
    border-radius: 20px;
    margin-top: 25px;
    padding: 20px;
    overflow-y: scroll;

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
