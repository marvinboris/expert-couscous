import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class GeneralWorkReportTracker extends PureComponent {
  state = {
    focusBar: null
  }

  onMouseMove = state => {
    if (state.isTooltipActive) this.setState({ focusBar: state.activeTooltipIndex });
    else this.setState({ focusBar: null });
  }

  render() {
    const { data, cms } = this.props;
    const { focusBar } = this.state;

    return (
      <ResponsiveContainer>
        <BarChart data={data} barGap={12} onMouseMove={this.onMouseMove}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey={cms.sessions} fill="#5A657D">
            {data.map((entry, index) => <Cell key={JSON.stringify(entry)} fill='#5A657D' fillOpacity={focusBar === index ? 1 : 0.2} />)}
          </Bar>
          <Bar dataKey={cms.publications} fill="#0085B3">
            {data.map((entry, index) => <Cell key={JSON.stringify(entry)} fill='#0085B3' fillOpacity={focusBar === index ? 1 : 0.2} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
