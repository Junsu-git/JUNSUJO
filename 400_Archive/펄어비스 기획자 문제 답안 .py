<Idle>
    <Branch Event="Input_Walk" Execute="Walk"/>
    <Branch Event="Input_Attack" Condition="Stamina>10" Execute="Attack"/>
    <Branch Event="Input_Jump" Condition="Stamina>10" Execute="Jump"/>
</>

<Walk>
    <Branch Event="Input_Neutral" Execute="Idle"/>
    <Branch Event="Input_Attack" Execute="Attack"/>
    <Branch Event="Input_Run" Condition="Stamina>0" Excute="Run"/> <!--걷는 중 달리기 액션이 들어오면 달림.-->
</>

<Run>
    <Branch Event="Input_Walk" Excute="Walk"> <!--달리는 중 의도적으로 걷기 액션이 들어오면 걸음.-->
    <Branch Event="Input_Walk" Condition="Stamina<10" Excute="Walk"/> <!--달리는 중, 스테미너가 다 해서 걸을 때, 다시 달리기 위한 스테미너 조건 -->
</>
 
<Jump>
    <Branch Event="Input_Nuteral" Condition="onGround == true" Execute="Idle"/>
    <Branch Event="Input_Walk" Condition="onGround == true" Execute="Walk"/>
    <Branch Event="Input_Run" Condition="onGround == true && Stamina>10" Execute="Run"/>
    <Branch Event="Jump_Attack" Condition="onGround == false && Stamina>10" Execute="JumpAttack_Combo1"/> <!--점프 중 공격을 했 을때, 공중에 떠있으며, 여전히 스테미너가 남아있을때, 점공 콤보 1을 실행 -->
    <Branch Event="Fall" Condition=""
</>

<JumpAttack_Combo1>
    <Branch Event="Action_End" Condition="onGround == false" Execute="Jump"/> 
    <Branch Event="Action_End" Condition="onGround == true" Execute="Idle"/>
    <Branch Event="Jump_Attack" Condition="JumpAttackState == 1 && Stamina>10" Execute="JumpAttack_Combo2"/> <!--점프 중 공격을 했 을때, 공중에 떠있으며, 여전히 스테미너가 남아있을때, 점공 콤보 2을 실행 -->
</>

<JumpAttack_Combo2>
    <Branch Event="Action_End" Condition="onGround == false" Execute="Jump"/>
    <Branch Event="Action_End" Condition="onGround == true" Execute="Idle"/>
    <Branch Event="Jump_Attack" Condition="JumpAttackState == 2 && Stamina>10" Execute="JumpAttack_Combo3"/> <!--점프 중 공격을 했 을때, 공중에 떠있으며, 여전히 스테미너가 남아있을때, 점공 콤보 3을 실행 -->
</>

<JumpAttack_Combo3> 
    <Branch Event="Action_End" Condition="onGround == false" Execute="Jump"/> 
    <Branch Event="Action_End" Condition="onGround == true" Execute="Idle"/>
</>

<Attack>
    <Branch Event="Action_End" Execute="Idle"/>
</>

<Fall>  <
    <Branch Event="Action_End" Condition="onGround == true" Excute"SuperHeroLanding"> <!--낙하 상태에서, 땅에 닿았을 때 -->
</>

<SuperHeroLanding>
    <Branch Event="Action_End" Excute"Idle"> 
</>