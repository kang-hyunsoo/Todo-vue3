<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Kaya's </router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{name:'Todos'}">TODOS</router-link>
        </li>
      </ul>
  </nav>
  <router-view/>
</template>

<script>
export default {}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>

<!--vue router 작동원리-->
<!--vue code를 컴파일해서 올려놓음 도메인 연결 -> 서버에 요청 -> html, js-->
<!--spa 만드는데 쉬운 방법-->

[이벤트 버블링]
클릭이벤트가 작동하면 타고타고 올라가서 부모의 클릭이벤트까지 작동됨 (모든 상위요소의 클릭이벤트를 실행시켜버림)
