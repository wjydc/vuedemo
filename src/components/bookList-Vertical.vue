<template>
    <ul class="bookList-Vertical"   >
        <li v-for="item in msg"  :key="item.id"  class="uterShadowo" :id="item.novelid">
            <router-link :to="{path: '/detail', query: { novalId: item.novelid}}">
                <p class="bokkCover"><img :src=item.thumb_cover alt=""></p>
                <div class="bookDescript">
                    <h2 class="des-title">{{item.title}}</h2>
                    <p class="des-des">{{item.rec_description}}</p>
                    <p class="des-satatu" v-if="item.updatestatus==='已完结'">
                        <span>{{item.classname}}</span><span class="seeNum">{{item.hits}}万人在看</span><span class="satusOver">{{item.updatestatus}}</span>
                    </p>
                     <p class="des-satatu" v-else>
                        <span>{{item.classname}}</span><span class="seeNum">{{item.hits}}万人在看</span><span class="satusIng">{{item.updatestatus}}</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'Vertical',
  props: ['msg']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
