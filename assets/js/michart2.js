const leyendaImagenes = {
    'Logitech G Pro X Superlight': '../../assets/img/logitechg/logitech_g_pro_x_superlight_2.jpg',
    'Razer DeathAdder V3 Pro': '../../assets/img/razer/razer_deathadder_v3_pro_2.jpg',
    'Zowie EC2-CW': '../../assets/img/benqzowie/benq_zowie_ec2cw_wireless_2.jpg',
    'Vaxee XE Wireless': '../../assets/img/vaxee/vaxee_xe_wireless_2.jpg',
    'Zowie EC2': '../../assets/img/benqzowie/benq_zowie_ec2b_2.jpg'
};

const newoptions = {
    series: [{
        data: [350, 250, 220, 180, 150]
    }],
    chart: {
        type: 'bar',
        height: 370,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            barHeight: '80%',
            distributed: true,
            horizontal: true,
            dataLabels: {
                position: 'bottom'
            },
            states: {
                hover: {
                  filter: {
                    type: 'none'
                  }
                }
              }
        }
    },
    
    colors: ['rgb(0, 148, 255)', 'rgb(50,211,44)', 'rgb(220,4,65)', 'rgb(255, 150, 26)', 'rgb(220,4,65)'],
    markers: {
        colors: ["#FFFFFF"]
      },
    dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
            fontSize: '14px',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            color: '#ffffff',
        },
        formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex]
        },
        offsetX: 0,
        dropShadow: {
            enabled: true
        }
    },
    stroke: {
        width: 1,
        colors: undefined
    },
    xaxis: {
        categories: ['Logitech G Pro X Superlight', 'Razer DeathAdder V3 Pro', 'Zowie EC2-CW', 'Vaxee XE Wireless', 'Zowie EC2'],
        labels: {
            style: {
              colors: "#fff"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
    },
    yaxis: {
        labels: {
            show: false
        },
        axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
    },
    title: {
        text: '',
        align: 'center',
        floating: true
    },
    subtitle: {
        text: '',
        align: 'center',
        color:  '#fff'
    },
    tooltip: {        
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const leyenda = w.globals.labels[dataPointIndex];
            const imagen = leyendaImagenes[leyenda];
            
            return (
                '<div class="custom-tooltip arrow_box">' +
                    '<span>' +
                        leyenda +
                        ": " +
                        series[seriesIndex][dataPointIndex] + 
                    '</span>' +
                    '<img class="py-2" src="' + imagen + '" alt="Imagen" />' +
                '</div>'
            );
        },
        theme: 'dark',
        x: {
            show: true
        },
        y: {
            title: {
                formatter: function () {
                    return ''
                }
            }
        }
    },
    legend: {
        show: false
    }
};

const newchart = new ApexCharts(document.querySelector("#newchart"), newoptions);
newchart.render();

  