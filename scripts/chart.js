function renderChart(ctx, stats, labels, pokemonName) {
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: `${pokemonName}'s Stats`,
                data: stats,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Transparente Füllfarbe
                borderColor: 'rgb(47, 48, 48)', // Linienfarbe
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 255,
                    ticks: {
                        stepSize: 50,
                        color: 'rgb(47, 48, 48)', // Schriftfarbe der Achsen
                        backdropColor: 'transparent',
                        font: {
                            family: 'Open Sans', // Schriftart
                            size: 12 // Schriftgröße
                        }
                    },
                    pointLabels: {
                        color: 'rgb(0, 0, 0)', // Schriftfarbe der Labels (z. B. "HP", "Attack", ...)
                        font: {
                            family: 'Open Sans', // Schriftart
                            size: 20, // Schriftgröße der Labels
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false  // Deaktiviert die Anzeige von Legenden
                },
                tooltip: {
                    enabled: true, // Tooltip anzeigen
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    titleFont: {
                        family: 'Open Sans', // Schriftart des Titels
                        size: 14 // Schriftgröße des Titels
                    },
                    bodyFont: {
                        family: 'Open Sans', // Schriftart des Inhalts
                        size: 12 // Schriftgröße des Inhalts
                    }
                }
            }
        }
    });
}
