describe('CSV Data Screenshot Test', () => {
  const csvFilePath = 'cypress/downloads/TEST.csv';
  const screenshotPath = 'cypress/screenshots/CSV_Screenshot.png';

  it('Should filter CSV data with same name and take a screenshot of that data and store in the given path', () => {
    cy.readFile(csvFilePath)
      .then((csvData) => {
        const csvContent = csvData.toString();
        const rows = csvContent.split('\n').map(row => row.split(','));
        const nameIndex = rows[0].findIndex(header => header.trim().toLowerCase() === 'name');

        const sameNameRows = Array.from(
          rows.slice(1).reduce((map, row) => {
            const name = row[nameIndex].trim();
            const existingRow = map.get(name) || [];
            map.set(name, [...existingRow, row]);
            return map;
          }, new Map()).entries()
        ).filter(([name, rows]) => rows.length > 1);

        cy.document()
          .then((doc) => {
            const element = doc.createElement('div');

            const tableContainer = doc.createElement('div');
            const table = doc.createElement('table');
            const tableBody = doc.createElement('tbody');
            const tableHeader = doc.createElement('tr');

            rows[0].forEach(header => {
              const tableHeaderCell = doc.createElement('th');
              tableHeaderCell.style.fontWeight = 'bold';
              tableHeaderCell.style.border = '1px solid #ccc';
              tableHeaderCell.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              tableHeaderCell.textContent = header;
              tableHeader.appendChild(tableHeaderCell);
            });
            tableBody.appendChild(tableHeader);

            sameNameRows.forEach(([name, rows]) => {
              rows.forEach(row => {
                const tableRow = doc.createElement('tr');
                tableRow.style.border = '1px solid #ccc';
                tableRow.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                row.forEach(cell => {
                  const tableCell = doc.createElement('td');
                  tableCell.style.padding = '5px';
                  tableCell.style.border = '1px solid #ccc';
                  tableCell.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  tableCell.textContent = cell;
                  tableRow.appendChild(tableCell);
                });
                tableBody.appendChild(tableRow);
              });
            });

            const tableName = doc.createElement('h2');
            tableName.style.textAlign = 'center';
            tableName.style.border = '1px solid #ccc';
            tableName.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            tableName.textContent = 'Duplicate Data'; // Update this line
            table.appendChild(tableBody);
            tableContainer.appendChild(tableName);
            tableContainer.appendChild(table);

            element.appendChild(tableContainer);
            element.style.margin = '10px';
            doc.body.appendChild(element);
            cy.wrap(element).as('csvElement');
          });

        cy.get('@csvElement')
          .screenshot(screenshotPath, {
            capture: 'viewport',
            clip: { x: 0, y: 0, width: 1920, height: 10000 }, // Increase the size
            blackout: ['[data-cy=header]', '[data-cy=footer]'],
          })
          .then(() => {
            cy.get('@csvElement').invoke('remove');
          })
          .then(() => {
            cy.log(`Screenshot saved at: ${screenshotPath}`);
          });
      });
  });


  // Generate a pie chart from the CSV data and save it as a screenshot
  it('Generate Pie Chart Screenshot', () => {
    const csvFilePath = 'cypress/downloads/TEST.csv'; // Add the correct path to your CSV file
    const screenshotPath = 'cypress/screenshots/screenshot.png'; // Add the correct path to your screenshot
    cy.readFile(csvFilePath)
      .then((csvData) => {
        cy.window()
          .then((win) => {
            if (!win.Chart) {
              cy.log('Loading Chart.js library...');
              cy.request('https://cdn.jsdelivr.net/npm/chart.js').then((response) => {
                // Inject Chart.js into the window object
                cy.window().then((win) => {
                  win.eval(response.body);
                });
              });
            }

            const csvContent = csvData.toString();
            const rows = csvContent.split('\n').map(row => row.split(','));
            const nameIndex = rows[0].findIndex(header => header.trim().toLowerCase() === 'name');
            const data = rows.slice(1).reduce((map, row) => {
              const name = row[nameIndex].trim();
              const count = map.get(name) || 0;
              map.set(name, count + 1);
              return map;
            }, new Map());

            const chart = {
              labels: Array.from(data.keys()),
              datasets: [{
                data: Array.from(data.values()),
                backgroundColor: getRandomColors(data.size),
              }],
            };

            const config = {
              type: 'pie',
              data: chart,
              options: {
                responsive: true, // Enable responsiveness
                legend: {
                  display: true,
                  position: 'left',
                },
                title: {
                  display: true,
                  text: 'Data Distribution',
                  fontSize: 20,
                  fontStyle: 'bold',
                },
              },
            };

            cy.document()
              .then((doc) => {
                const element = doc.createElement('div');
                element.style.width = '50%'; // Set width and height to take less space
                element.style.height = '50%';
                element.style.margin = '0 auto'; // Center the chart
                const canvasElement = doc.createElement('canvas');
                const ctx = canvasElement.getContext('2d');
                win.Chart.defaults.responsive = true; // Enable responsiveness
                new win.Chart(ctx, config);
                element.appendChild(canvasElement);
                doc.body.appendChild(element);
                cy.wrap(element).as('chartElement');
              });

            const pieChartScreenshotPath = `${screenshotPath.replace('.png', '')}_PieChart.png`;
            cy.get('@chartElement')
              .screenshot(pieChartScreenshotPath, {
                capture: 'viewport',
                clip: { x: 0, y: 0, width: 1920, height: 10000 },
              })
              .then(() => {
                cy.get('@chartElement').invoke('remove');
              })
              .then(() => {
                cy.log(`Pie Chart saved at: ${pieChartScreenshotPath}`);
              });
          });
      });
  });

  // Helper function to get random colors for pie chart
  function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colors;
  }
});



