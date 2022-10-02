<script>
    import { useNavigate } from 'svelte-navigator';

    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem('authToken', 'askdfjklasdfjalsjdf');
        navigate('/chat');
    }
</script>

<div class="login-page">
    <div class="image-column">
        <img src="images/texting.png" class="image-column__img" alt="people texting" />
    </div>

    <div class="form-column">
        <form class="login-page__form">
            <h3 class="login-page__form-title">Вход</h3>

            <div class="login-page__form-group">
                <label class="login-page__form-label" for="mobile_number">Номер телефона</label>
                <input placeholder="+78651334455" class="login-page__form-field" name="mobile_number" type="text" />
            </div>

            <div class="login-page__form-group">
                <label class="login-page__form-label" for="password">Пароль</label>
                <input placeholder="+78651334455" class="login-page__form-field" name="password" type="password" />
            </div>
            
            <button class="login-page__button" on:click={handleLogin}>
                Войти
            </button>
        </form>
    </div>
</div>

<style lang="scss">
    .login-page {
        display: flex;

        &__form {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fff;
            width: calc(670/800 * 100%);
            padding: 84px 36.5px;
            border-radius: 15px;
            box-sizing: border-box;
        }

        &__form-title {
            font-size: 2.25rem;
            font-family: 'Roboto-Regular';
            color: #000;
            margin-bottom: 30px;
        }

        &__form-group {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 30px;
        }

        &__form-label {
                color: #404040;
                font-family: 'Roboto-Medium';
                font-size: 1.125rem;
        }

        &__form-field {
            border: 1px solid #858585;
            border-radius: 10px;
            padding: 20px 25px;
            margin-top: 10px;
            font-size: 1.375rem;
            color: #404040;
            font-family: 'Roboto-Regular';

            &::placeholder {
                color: #AEAEAE;
            }
        }

        &__button {
            border: none;
            cursor: pointer;
            color: #fff;
            background: var(--primary-color);
            font-family: 'Roboto-Regular';
            font-size: 1.625rem;
            padding: 15px 30px;
            border-radius: 10px;
        }
    }

    .image-column {
        display: flex;
        flex: 1;
        align-items: center;
        background: #fff;
        height: 100vh;

        &__img {
            max-width: 100%;
        }
    }

    .form-column {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    @media screen and (max-width: 1200px) {
        .login-page {
            flex-direction: column-reverse;

            &__form {
                width: 100%;
                padding: 0 36.5px;
                height: 50vh;
                justify-content: center;
            }
        }

        .image-column {
            justify-content: center;

            &__img {
                height: 50vh;
            }
        }
    }

    @media screen and (max-width: 400px) {
        .image-column {
            flex: auto;
            height: 50vh;
            justify-content: center;

            &__img {
                height: 40vh;
            }
        }
    }

</style>