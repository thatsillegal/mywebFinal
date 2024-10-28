<template>
    <div v-if="isVisible" class="floating-modal" @click.self="closeModal">
        <div class="modal-content">
            <span class="close" @click="closeModal">
                <bold>X</bold>
            </span>
            <!-- 显示传入的内容 -->
            <iframe :src="content" frameborder='0' scrolling='no'></iframe>
        </div>
    </div>
</template>

<!-- width='100%' height='100vh' frameborder='0' scrolling='no' -->

<script>
export default {
    props: {
        content: {
            type: String,
            required: true
        },
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close'); // 触发关闭事件
        }
    }
};
</script>

<style scoped>
iframe {
    width: 100%;
    height: 90vh;
}

.floating-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    width: 90vw;
    height: 90vh;
    background-color: white;
    padding: 20px;
    /* margin:30px; */
    border-radius: 8px;
    position: relative;
}

.close {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>