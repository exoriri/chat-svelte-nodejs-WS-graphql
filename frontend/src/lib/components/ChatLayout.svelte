<script lang="ts">
    import { sendMessage } from "src/generated";
    import Avatar from "./Avatar.svelte";
    import Button from "./Button.svelte";
    import sendIcon from '../../assets/send-icon.svg';
    import UserHeader from "./UserHeader.svelte";
    import { user } from 'src/stores';

    export let imageUrl;
    export let name = '';
    export let isUserHeader = false;

    let message = '';

    const onSend = async () => {
        await sendMessage({ 
            variables: {
                chat_id: '4',
                content: message
            }
         });
        message = '';
    };

    const logout = () => {
        user.update(() => null);
        localStorage.removeItem('user');
    }

</script>

<style lang="scss">
    .header {
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 20px;
        padding: 15px 20px;

        &__title {
            font-family: 'Roboto-Regular';
            font-size: 1.875rem;
            color: #000;
            margin-left: 20px;
        }
    }


    .footer {
        display: flex;
        position: absolute;
        background: #fff;
        width: 100%;
        border-radius: 20px;
        padding: 15px 20px;
        bottom: var(--footer-margin);
        box-sizing: border-box;

        :global(.footer__btn) {
            display: flex;
            flex: .3;
            align-items: center;
            margin-left: auto;
            border-radius: 20px;
            max-width: 247px;
            padding: 15px 30px;
            background: var(--primary-color-dim);
        }

        &__btn-text {
            font-family: 'Roboto-Regular';
            font-size: 26px;
            color: #fff;
            margin-right: 20px;
        }

        &__input {
            border: none;
            outline: none;
            font-family: 'Roboto-Regular';
            font-size: 26px;
            flex: .7;

            &::placeholder {
                color: #AEAEAE;
            }
        }
    }
    
</style>

<div>
    {#if isUserHeader} 
        <UserHeader 
            avatarImageUrl={$user?.avatar_url} 
            userName={$user?.fullname}
            on:logout={logout}
        />
    {/if}
    <slot />
    <footer class="footer">
        <input bind:value={message} placeholder="type smth here..." class="footer__input" type="text" />
        <Button on:click={onSend} class="footer__btn">
            <span class="footer__btn-text">
                Отправить
            </span>
            <img src={sendIcon} alt="send">
        </Button>
    </footer>
</div>

