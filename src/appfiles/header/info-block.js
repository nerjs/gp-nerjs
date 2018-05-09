const React = require('react');
const { withRouter } = require('react-router-dom')
const CodeIco = require('react-icons/lib/io/code-working')
const CommentIco = require('react-icons/lib/fa/commenting')
const BreadcrambIcoVer = require('react-icons/lib/md/more-vert')
const BreadcrambIcoGor = require('react-icons/lib/md/more-horiz')

class InfoBlockHeader extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="info-block">
				<BreadcrambIcoVer />
				<BreadcrambIcoGor />
				<CodeIco />
				<CommentIco />
			</div>
		);
	}
}

module.exports = withRouter(InfoBlockHeader)