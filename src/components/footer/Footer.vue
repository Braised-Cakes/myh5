<template>
	<footer class="footer">
		<div>
			<span>
				Hi群:
				<a href="baidu://message/?id=1552117" title="hi">1552117</a>
			</span>
			<span>
				邮箱:
				<a href="mailto:toos-group@baidu.com" title="邮箱">toos-group@baidu.com</a>
			</span>
		</div>
		<div>
			<ul>
				<li>
					<a href="http://haichuan.baidu.com" target="_blank">数据质量-海川</a>
				</li>
				<li>
					<a href="http://rmtc.baidu.com" target="_blank">移动测试-RMTC</a>
				</li>
				<li>
					<a href="http://titans.baidu.com" target="_blank">CI工具链-泰坦</a>
				</li>
				<li>
					<a href="http://va.baidu.com" target="_blank">产品评测-VA</a>
				</li>
				<li>
					<a href="http://qapi.baidu.com" target="_blank">质量开发中心</a>
				</li>
			</ul>
		</div>
		<div>
			<span>Copyright©2017</span>
			<span>QAEP</span>
			<span>
				<a href="http://qaep.baidu.com" target="_blank">更多产品请点击</a>
			</span>
		</div>
	</footer>
</template>
<script>
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 20px 0;
  font-size: 12px;
  background-color: #f9f9f9;
  margin-top: 20px;
}

.footer a {
  text-decoration: none;
  color: #212121;
}

.footer > div ul {
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 0;
}

.footer > div li {
  position: relative;
  display: inline-block;
  padding: 0 8px;
  font-size: 12px;
}

.footer > div li:not(:last-of-type):after {
  position: absolute;
  content: "";
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  height: 1em;
  width: 1px;
  background-color: #212121;
}

.footer > div:nth-of-type(1) > span {
  padding-right: 8px;
}

.footer > div:nth-of-type(3) > span {
  display: inline-block;
  padding-right: 8px;
}

.footer > div:nth-of-type(3) > span:first-child {
  position: relative;
}

.footer > div:nth-of-type(3) > span:first-child:after {
  position: absolute;
  content: "";
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  height: 1em;
  width: 1px;
  background-color: #212121;
}

.footer > div:nth-of-type(3) > span:nth-child(2) {
  position: relative;
  padding-left: 28px;
}

.footer > div:nth-of-type(3) > span:nth-child(2):before {
  position: absolute;
  left: 6px;
  top: 0;
  height: 1.5em;
  width: 1.5em;
  content: ""; // background: url(../../img/toos_eplogo.png) no-repeat;
  background-size: 100%;
  background-position: 0;
}

.footer > div:nth-of-type(3) > span:nth-child(3) {
  font-weight: 500;
}
</style>
