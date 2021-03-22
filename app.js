const app = Vue.createApp({
	el: '#app',
	data() {
		return {
			data: [
				[60, 25.7, null],
				[-2, null, 79],
				[200, 710, 90],
				[99, 1200, 62]
			]
		}
	},
	methods: {
		addRow: function () {
			this.$data.data.push(Array(this.$data.data[0].length).fill(null));
		},
		removeRow: function () {
			this.$data.data.splice(this.$data.data.length - 1, 1);
		},
		addColumn: function () {
			this.$data.data.forEach(row => row.push(null));
		},
		removeColumn: function () {
			this.$data.data.forEach(row => row.splice(row.length - 1, 1));
		}
	}
});


app.component('editable-table', {
	template: '#table-template',
	props: {
		table: Array
	},
	data: function () {
		return this.table;
	},
	computed: {},
	methods: {
		edit: function (rowIndex, cellIndex) {
			Array.from(document.querySelectorAll('.cell-input'))
				 .filter(item => item.style.display != 'none')
				 .forEach(item => this.save(parseInt(item.id.split('-')[1]), parseInt(item.id.split('-')[2]), parseFloat(item.value)));
			document.querySelector('#cell-' + rowIndex + '-' + cellIndex).style.display = 'none';
			document.querySelector('#input-' + rowIndex + '-' + cellIndex).style.display = 'inline';
		},
		save: function (rowIndex, cellIndex, cell) {
			this.table[rowIndex][cellIndex] = isNaN(parseFloat(cell)) ? null : parseFloat(cell);
			document.querySelector('#cell-' + rowIndex + '-' + cellIndex).style.display = 'inline';
			document.querySelector('#input-' + rowIndex + '-' + cellIndex).style.display = 'none';
		},
		sum: function (column) {
			const numbers = this.table.map(row => row[column]).filter(cell => cell != null);
			if (numbers.length > 0) {
				return numbers.reduce((a, b) => a + b, 0);
			} else {
				return null;
			}
		},
		average: function (row) {
			const numbers = this.table[row].filter(cell => cell != null);
			if (numbers.length > 0) {
				return numbers.reduce((a, b) => a + b, 0) / numbers.length;
			} else {
				return null;
			}
		}
	}
});

app.mount('#app');
