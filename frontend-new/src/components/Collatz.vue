<template>
  <div>
    <div class="stage" @click="pop"></div>
  </div>
</template>
<script>
import * as PIXI from 'pixi.js'


/**
 * 
 *  THIS IS A MASSIVE FAIL
 *  FUCK PIXI JS
 * 
 */
export default {
  name: 'Collatz',

  mounted() {
    this.setupPixi()

    let n = 670617279
    const collatz = this.crateCollatzSequence(n)
    
    this.renderCollatzSequence(collatz.sequence)

    console.log(`collatz.sequence`, collatz.sequence)
    console.log('Finished in: ', collatz.steps, ' steps')
  },

  methods: {

    setupPixi() {
      this.app = new PIXI.Application({
        antialias: true,
        backgroundColor: '0x000000'
      });
      this.$el.appendChild(this.app.view);
      this.app.renderer.view.style.display = "block";
      this.app.renderer.autoResize = true;
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    },

    addLine(x, y, len, rotation) {
      // 4a. Create a line
      var line = new PIXI.Graphics()
        
      // Define line style (think stroke)
      // width, color, alpha
      line.lineStyle(3, 0xD5402B, 1)
        
      // Define line position - this aligns the top left corner of our canvas
      line.position.x = x
      line.position.y = y
        
      // Define pivot to the center of the element (think transformOrigin)
      // line.pivot.set(0, 100)
      line.rotation = rotation // in radiants - use google to convert degrees to radiants
        
      // Draw line
      // line.moveTo(x, y)
      line.lineTo(0, -len)

      this.app.stage.addChild(line)
    },

    addParticle() {
      let particle = new PIXI.Graphics();
      particle.beginFill("0x75F4F4");
      particle.drawCircle(0, 0, 10);
      particle.endFill();
      particle.x = window.innerWidth * 0.5
      particle.y = window.innerHeight * 0.5
      console.log(`particle.x`, particle.x)
      this.app.stage.addChild(particle);
    },

    renderCollatzSequence(sequence) {
      // sequence = new Array(180).fill().map((_, i) => i)
      let angle = Math.PI / 4
      const angleStep = Math.PI / 24

      const container = new PIXI.Container()
      const pivotX = window.innerWidth / 2
      const pivotY = window.innerHeight / 2
      container.position.x = pivotX
      container.position.y = pivotY

      const len = 20
      let x1 = 0
      let y1 = 0
      const x2 = 0
      const y2 = len
      let prevX = 0
      let prevY = 0
      
      sequence.forEach((val) => {
        const isEven = val % 2 == 0

        if (isEven) angle += angleStep

        let line = new PIXI.Graphics()
        line.lineStyle(3, 0x888888, 0.1)    
        // line.position.x = 0
        // line.position.y = 0
        
        const R = [
          [ Math.cos(angle), -Math.sin(angle) ],
          [ Math.sin(angle), Math.cos(angle) ]
        ]
        const pointMatrix = [
          [ x2 - x1 ],
          [ y2 - y1 ],
        ]
        const anotherPointMatrix = [
          [ prevX ],
          [ prevY ],
        ]

        const dest = this.addMatrix(this.multiplyMatrix(R, pointMatrix), anotherPointMatrix)
        const x3 = dest[0][0]
        const y3 = dest[1][0]
        console.log(`x1, y1`, x1, y1)
        console.log(`x3, y3`, x3, y3)
        console.log(`prevX, prevY`, prevX, prevY)
        // line.pivot.set(0, 10)
        // line.rotation = isEven ? angle : -angle
        line.moveTo(x1, y1)
        line.lineTo(x3 + prevX, -(y3 + prevY))

        container.addChild(line)

        prevX = x3
        prevY = y3
      })
      this.app.stage.addChild(container)
    },

    rotateLine() {
      /**
       * R = [cos a, -sin a
        sin a, cos a]
        Input = (x1, y1)
        Output = (x1*cos a - y1* sin a, x1*sin a + y1*cos a)
       */
    },

    addMatrix(a, b) {
      const result = new Array(a.length)
      for (let i = 0; i < result.length; i++) {
        result[i] = new Array(a[i].length)
        for(let j = 0; j < result[i].length; j++) {
          result[i][j] = a[i][j] + b[i][j]
        }
      }
      return result
    },

    multiplyMatrix(a, b) {
      const aNumRows = a.length,   aNumCols = a[0].length,
        /** bNumRows = b.length,*/ bNumCols = b[0].length
      const result = new Array(aNumRows);  // initialize array of rows
      for (let r = 0; r < aNumRows; ++r) {
        result[r] = new Array(bNumCols); // initialize the current row
        for (let c = 0; c < bNumCols; ++c) {
          result[r][c] = 0;             // initialize the current cell
          for (let i = 0; i < aNumCols; ++i) {
            result[r][c] += a[r][i] * b[i][c];
          }
        }
      }
      return result;
    },

    crateCollatzSequence(n) {
      const sequence = []
      let steps = 0

      do {
        steps++
        n = this.collatz(n)
        sequence.push(n)
      } while (n != 1)

      return {
        sequence,
        steps,
      }
    },

    collatz(num) {
      if (num % 2 == 0) {
        return num / 2
      } else 
      return num * 3 + 1
    }
  }
}
</script>
<style scoped>
  
</style>