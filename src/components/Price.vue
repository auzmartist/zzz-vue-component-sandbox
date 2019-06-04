<template>
<div class="price">
	<span>{{currency}}<b>{{price}}</b></span><br>
	<span style="font-size: 0.6em;">+ {{currency}}{{tax}} Tax Est.</span>
</div>
</template>

<script>
export default {
	name: 'Price',
	props: {
		price: {
			type: Number,
			required: true,
		},
		tax: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="stylus" scoped>
.price {
	margin-bottom: 8px;
	text-align: right;
}
</style>