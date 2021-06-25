jQuery(document).ready(function($) {
  let Afont = 0
  $('body').click(function(e) {
    // const a = ['❤富强❤', '❤民主❤', '❤文明❤', '❤和谐❤', '❤自由❤', '❤平等❤', '公正', '法治', '爱国', '敬业', '诚信', '友善']
    const language = ['❤富强❤', '❤民主❤', 'C++', 'Python', '❤文明❤', '❤和谐❤', 'PHP', 'Java', '❤和谐❤', '❤自由❤', '❤平等❤', 'HTML', 'CSS', 'JavaScript', 'C#', 'MySQL', '公正', '法治', '爱国', 'MongoDB', 'Linux', '敬业', '诚信', '友善']
    const x = e.pageX
    const y = e.pageY
    const $i = $('<span/>').text(language[Afont])
    Afont = (Afont + 1) % language.length
    $i.css({
      'z-index': 9999,
      top: y - 20,
      left: x,
      position: 'absolute',
      'font-weight': 'bold',
      color: randomColor(),
      'font-size': '20px'
    })
    function randomColor() {
      return 'rgb(' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ')'
    }
    $('body').append($i)
    $i.animate(
      {
        top: y - 180,
        opacity: 0
      },
      1500,
      function() {
        $i.remove()
      }
    )
  })
})
