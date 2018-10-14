let blocks = []
let originalColours = ['red', 'blue', 'green']
let colours = originalColours.concat()
let move = 8
let moving = false
colours = colours.concat(colours).concat(colours)
colours.pop()
colours.push(null)

let keys = []
keys[37] = 'left'
keys[38] = 'up'
keys[39] = 'right'
keys[40] = 'down'

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const rand = Math.floor(Math.random() * (i + 1));

		[array[i], array[rand]] = [array[rand], array[i]]
	}

	return array
}

function draw() {
	for (var i = 0; i < colours.length; i++) {
		let current = $(`.wrapper > div:nth-child(${i + 1})`)
		let child = current.children()

		current.hide()
		child.html('')
		child.css({background: colours[i]})
		child.removeClass('null')
		if (colours[i] == null) {
			child.html('Move')
			child.css({background: 'transparent'})
			child.addClass('null')
			move = i
		}
		current.fadeIn('slow')
	}
}

function moveTile(event) {
	if (!moving) {
		let movableTile = $(`.index-${move + 1}`)
		let direction = keys[event.keyCode]

		if (direction != null) {
			let error = false
			let swap = 0

			switch (direction) {
				case 'left':
					error = move == 0 || move == 3 || move == 6 ? true : false
					swap = -1
					break
				case 'right':
					error = move == 8 || move == 2 || move == 5 ? true : false
					swap = 1
					break
				case 'up':
					error = move < 3 ? true : false
					swap = -3
					break;
				case 'down':
					error = move > 5 ? true : false
					swap = 3
					break
			}

			if (!error) {
				moving = true
				let otherTile = $(`.index-${move + 1 + swap}`)
				let otherTileChild = otherTile.children()

				movableTile.animate({
					top: otherTile.offset().top - movableTile.offset().top,
					left: otherTile.offset().left - movableTile.offset().left
				}, 500, function () {
					otherTile.append($(this).children())
					$(this).css({left: 0, top: 0})
					moving = false
				})

				otherTile.animate({
					top:  movableTile.offset().top - otherTile.offset().top,
					left: movableTile.offset().left - otherTile.offset().left
				}, 500, function () {
					movableTile.append(otherTileChild)
					$(this).css({left: 0, top: 0})
					moving = false
				})

				colours[move] = colours[move + swap]
				colours[move + swap] = null
				move = move + swap
			}
		}
	}
}

document.addEventListener('keyup', moveTile)

shuffle(colours)
draw()