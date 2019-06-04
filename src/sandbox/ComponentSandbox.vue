<template>
	<div class="component-sandbox">
		<h2>{{componentName}}</h2>

		<div class="redraw" @click="redraw">
			<i class="fa fa-refresh"></i>
		</div>
		<span>{{description}}</span>

		<div class="props" v-if="component.props">
			<sandbox-prop v-for="(p, key) in doc.props" :key="key"
				:prop="p" v-model="sandbox.props[p.name]"/>
		</div>

		<div class="sandbox">
			<slot v-if="wc"></slot>
			<div v-else :is="component" v-bind="sandbox.props" v-on="sandbox.events" :key="draw"></div>
		</div>

		<div class="events" v-if="eventsDoc">
			<div class="feed">
				<div v-for="e in events" :key="e.id">
					<p>{{e.id}} | {{e.date}} | {{e.event}} &nbsp;&nbsp;&nbsp;&nbsp; {{e.payload}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import SandboxProp from './SandboxProp.vue'

export default {
	name: 'component-sandbox',
	components: {
		SandboxProp,
	},
	props: {
		component: Object,
		description: String,
		propsDoc: Object,
		eventsDoc: Object,
		wcEvent: Object,
		wc: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		doc: {
			props: [],
		},
		sandbox: {
			props: {},
			events: {},
		},
		events: [],
		draw: false,
	}),
	computed: {
		componentName() {return `<${this.component.name}>`},
	},
	methods: {
		redraw() {
			this.draw = !this.draw
			if(this.wc) {
				this.$emit('reset', this.formatProps())
			}
		},
		formatProps() {
			const props = []
			for(let key in this.sandbox.props) {
				props.push({name: key, value: this.sandbox.props[key]})
			}
			return props
		},
		registerVueComponentProps() {
			for(let key in this.component.props) {
				// console.log(this.component.props)
				const prop = {
					...this.component.props[key],
					name: key,
					type: typeof this.component.props[key].type(),
					description: (this.propsDoc && this.propsDoc[key]) ? this.propsDoc[key].description : null,
				}
				this.doc.props.push(prop)

				if(prop.default) {
					Vue.set(this.sandbox.props, key, (typeof prop.default === 'function') ?
						prop.default() : prop.default)
				}
			}
		},
		registerWebComponentProps() {
			for(let key in this.propsDoc) {
				const prop = {
					...this.propsDoc[key]
				}
				this.doc.props.push(prop)

				if(prop.default) {
					Vue.set(this.sandbox.props, key, (typeof prop.default === 'function') ?
						prop.default() : prop.default)
				}
			}
		},
		registerEvents() {
			for(let key in this.eventsDoc) {
				this.sandbox.events[key] = this.logEvent.bind(this, key)
			}
			if(this.wc) {
				this.$watch('wcEvent', (e) => {
					this.logEvent(e.event, e.payload)
				}, {
					deep: true,
				})
			}
		},
		logEvent(event, payload) {
			let d = new Date();
			this.events.unshift({
				id: this.events.length,
				date: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
				event,
				payload,
			});
		},
	},
	mounted() {
		if(this.wc) {
			this.registerWebComponentProps()
		} else {
			this.registerVueComponentProps()
		}
		this.registerEvents()
	},
};
</script>

<style lang="stylus" scoped>
@require '~stylus-mixins/src/mixins.styl'
@require './variables.styl'

.component-sandbox {
	position: relative
	padding: 8px
	border: 2px solid $border
	border-radius: 6px
	h2 {
		margin-top: 0
		color: $label
	}
}

.props
	flex(flex-start, center)
	flex-wrap: wrap

.sandbox
	flex(center, center)
	.shareWidth
		width: 50%
	.proto-view
		width: 500px
		height: 300px

div.feed
	width: 100%
	min-height: 50px
	max-height: 320px
	overflow-y: auto
	padding: 4px 16px
	border-radius: 3px
	& > p
		font-family: monospace
		color: #444

div.redraw {
	absPos(8px, 8px, 0, 0)
	circle(32px)
	flex(center, center)
	background: darken($border, 20%)
	color: #5c6
	cursor: pointer
	border: 1px solid $border
	transition: 0.0s all linear
	&:hover {
		transition: 0.6s all linear
		transform: rotate(180deg)
		border-color: rgba(#5c6, 0.4)
		box-shadow: 0 0 4px #55cc66
	}
}
</style>
