import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useForm, ErrorMessage } from "react-hook-form";
import axios from "axios";

import Layout from "../../components/layout";
import {
	getPostBySlug,
	postComment,
	commentDelete,
} from "../../redux/actions/postActions";
import isEmpty from "../../utils/is-empty.js";

function Single(props) {
	const router = useRouter();
	const postSlug = router.query.slug;
	const { errors, handleSubmit, register, reset } = useForm();
	const { invalidComment } = useSelector((state) => {
		return state.errors !== null ? state.errors : false;
	});
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const post = props.post;

	let postData;
	if (post === null) {
		postData = "";
	} else {
		postData = (
			<div className="card card-body mb-3 post">
				<div className="row">
					<div className="col-md-2">
						<Link href={`/profile/${post.User.Profile.handle}`}>
							<a>
								<img
									className="rounded-circle d-none d-md-block"
									src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
									alt=""
								/>
							</a>
						</Link>
						<br />
						<p className="text-center">{post.User.name}</p>
					</div>
					<div className="col-md-10">
						<h2>{post.title}</h2>
						<p className="lead">{post.content}</p>
					</div>
				</div>
			</div>
		);
	}

	function saveComment(e) {
		// console.log(e);
		dispatch(postComment(postId, e));
		reset();
	}

	function removeComment(commentId) {
		if (window.confirm("Do you want to remove this comment ?")) {
			dispatch(commentDelete(commentId, postId));
		}
	}

	function deleteCommentButton(comment) {
		if (comment.userId === user.id) {
			return (
				<button
					type="submit"
					onClick={() => removeComment(comment.id)}
					className="btn btn-danger"
				>
					Delete
				</button>
			);
		}
	}

	let commentLists;
	if (post === null || isEmpty(post.Comments)) {
		commentLists = "";
	} else {
		commentLists = post.Comments.map((comment) => {
			return (
				<div key={comment.id} className="card card-body mb-3 post">
					<div className="row">
						<div className="col-md-2">
							<Link href={`/profile/${post.User.Profile.handle}`}>
								<a>
									<img
										className="rounded-circle d-none d-md-block"
										src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
										alt=""
									/>
								</a>
							</Link>
							<br />
							<p className="text-center">{comment.User.name}</p>
						</div>
						<div className="col-md-10">
							<p className="lead">{comment.comment}</p>
							{deleteCommentButton(comment)}
						</div>
					</div>
				</div>
			);
		});
	}

	let commentBox;
	if (!isAuthenticated) {
		commentBox = "";
	} else {
		commentBox = (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Somthing...</div>
					<div className="card-body">
						<form onSubmit={handleSubmit(saveComment)}>
							<div className="form-group">
								<textarea
									ref={register({ required: "Please add a comment" })}
									className="form-control form-control-lg"
									placeholder="Comment here"
									name="comment"
								></textarea>
								<ErrorMessage
									errors={errors}
									name="comment"
									as="i"
									className="alert-danger"
								/>
								<br />
								<i className="alert-danger">
									{invalidComment && invalidComment}
								</i>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Layout
			title={`${props.post.title} | Devzilla`}
			desc="creating loader in nextjs"
			backButton={true}
		>
			<div className="row">
				<div className="col-md-12">
					{postData}
					{commentLists}
					<div className="comments">{commentBox}</div>
				</div>
			</div>
		</Layout>
	);
}

Single.getInitialProps = async (ctx) => {
	const slug = ctx.query.slug;
	let res = {};
	const axioscfg = ctx.req ? { baseURL: "http://localhost:3000" } : {};
	res = await axios.get(`/api/post-slug/${slug}`, axioscfg);
	// console.log(res.data);
	return { post: res.data };
};

export default Single;
