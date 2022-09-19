<script>
    export let imageUrl;

    export let width = '';
    export let height = '';

    const avatarWidth = width || '50px';
    const avatarHeight = height || '50px';
</script>

<style lang="scss">
    .avatar {
       &__image {
        border-radius: 50%;
       } 
    }
</style>

<div class="avatar" style="width: {avatarWidth}; min-width: {avatarWidth}; height: {avatarHeight}; min-height: {avatarHeight} ">
    <img 
        src={imageUrl} 
        alt="avatar profile" 
        class="avatar__image"
        width="100%"
    />
</div>