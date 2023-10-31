/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  reporters: [
    'default',
    [
        'jest-sonar',
        {
            outputDirectory: 'reports',
            outputName: 'sonar-report.xml'
        }
    ]
]
};

module.exports = config;