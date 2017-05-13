import React, { Component } from 'react';
import { Link } from 'react-router';
import './Account.scss';

class Account extends Component {
	static defaultProps = { params: {} };

	render() {
		return (
			<section className="Account">
				<div className="container">
					<h1>Your personal dashboard<br />
					<small>{this.props.params.username}</small></h1>
					<div className="Account__biography">
						<b>bio:</b> Lorem Ipsum，也称乱数假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着Lorem Ipsum段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus PageMaker”也通过同样的方式使Lorem Ipsum落入大众的视野。
						<br />
						🌍 <a href="lalka">https://website.com/</a>
					</div>
					<div className="col-md-6">
						<h2>Your repositories</h2>
						<div className="row background">
							<div className="col-md-8">
								<h4>Name</h4>
							</div>
							<div className="col-md-4">
								<h4>Commits</h4>
							</div>
						</div>
						<div className="row">
							<div className="col-md-8">
								<Link to={`/user/${this.props.params.username}/repository`}>repository name</Link>
							</div>
							<div className="col-md-4">
								<p>12 <small>(latest 12.05.2017)</small></p>
							</div>
						</div>

						<h2>Your contributes</h2>
						<div className="row background">
							<div className="col-md-8">
								<h4>Name</h4>
							</div>
							<div className="col-md-4">
								<h4>Commits</h4>
							</div>
						</div>
						<div className="row">
							<div className="col-md-8">
								<Link to={`/user/${this.props.params.username}/repository`}>repository name</Link>
							</div>
							<div className="col-md-4">
								<p>12 <small>(latest 12.05.2017)</small></p>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<h2>Your commits</h2>
					</div>
				</div>
			</section>
		);
	}
}

export default Account;
