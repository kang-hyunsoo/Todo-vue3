<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Kaya's </router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{name:'Todos'}">TODOS</router-link>
        </li>
      </ul>
  </nav>
  <div class="container">
    <router-view/>
  </div>

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

<!--[이벤트 버블링]-->
<!--클릭이벤트가 작동하면 타고타고 올라가서 부모의 클릭이벤트까지 작동됨 (모든 상위요소의 클릭이벤트를 실행시켜버림)-->
<!--그래서 js로 구현할 때에는 Event.stopPropagation()을 click event 함수 안에 적용하여 이를 방지하는데-->
<!--vue에서는 .stop으로 이벤트 버블링을 막을 수 있음-->


원시타입 / 참조타입
원시타입은 값자체를 담는데, 참조타입은 주소값을 객체에 담는다.
c = {a: 1}
d = {a: 1}
c !== d

e = d (주소 값을 넣어줌)
d === e //true

e === c //false

d.a = 2
e.a 도 2가되지만 c.a는 변함이 없음

a = {q:3}
c = {...a}
a.q // 4
c.q //3

안에 있는 값을 비교할 때는 JSON.stringify()로 값을 비교함
순서가 다른 객체도 비교할 수 있는 라이브러리 => lodash (._isEqual(c, e))

lo