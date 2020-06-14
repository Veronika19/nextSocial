import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useForm, ErrorMessage } from "react-hook-form";

import Layout from "../../components/layout";
import {
	getAllPost,
	addPost,
	deletePost,
} from "../../redux/actions/postActions";

function Articles() {
	const { errors, register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const postErr = useSelector((state) => state.errors);
	const { posts, loading } = useSelector((state) => state.post);
	const { push } = useRouter();

	// if (!isAuthenticated) push("/login");

	React.useEffect(() => {
		dispatch(getAllPost());
	}, [dispatch]);

	function savePost(e) {
		// console.log(e);
		dispatch(addPost(e, reset));
	}

	function removeFeed(postId) {
		if (window.confirm("Do you want to remove this feed ?")) {
			dispatch(deletePost(postId));
		}
	}

	function deleteOption(post) {
		if (user.id === post.User.id) {
			return (
				<button
					type="submit"
					onClick={() => removeFeed(post.id)}
					className="btn btn-danger"
				>
					Delete
				</button>
			);
		}
	}

	let postFeed;
	if (posts) {
		postFeed = posts.map((post) => {
			return (
				<div key={post.id} className="row" style={{ marginBottom: "50px" }}>
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
						<h3 className="card-title">{post.title}</h3>
						<p className="lead">{post.content}</p>
						<button type="button" className="btn btn-light mr-1">
							<i className="text-info fas fa-thumbs-up"></i>
							<span className="badge badge-light">{post.likesCount}</span>
						</button>
						<Link href={`/post/${post.id}/comment/`}>
							<a className="btn btn-info mr-1">
								Comments - ({post.commentsCount})
							</a>
						</Link>
						{deleteOption(post)}
					</div>
				</div>
			);
		});
	}

	let postBox;
	if (!isAuthenticated) {
		postBox = "";
	} else {
		postBox = (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						What's on your mind ...
					</div>
					<div className="card-body">
						<form onSubmit={handleSubmit(savePost)}>
							<div className="form-group">
								<input
									ref={register({ required: "Please enter a title" })}
									className="form-control form-control-lg"
									placeholder="Post Title"
									name="title"
								/>
								<ErrorMessage
									errors={errors}
									name="title"
									as="i"
									className="alert-danger"
								/>
								<br />
								<i className="alert-danger">
									{postErr !== null ? postErr.title : ""}
								</i>

								<textarea
									ref={register({
										required: "Please enter something to post",
									})}
									className="form-control form-control-lg"
									placeholder="Post Content"
									name="content"
								></textarea>
								<ErrorMessage
									errors={errors}
									name="content"
									className="alert-danger"
									as="i"
								/>
								<br />
								<i className="alert-danger">
									{postErr !== null ? postErr.content : ""}
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
		<Layout title="Articles | Dev Zilla">
			<div className="row">
				<div className="col-md-12">
					{postBox}
					<div className="posts">
						<div className="card card-body mb-3">{postFeed}</div>
					</div>
				</div>
			</div>

			<style jsx>
				{`
					.posts .row .col-md-2 img {
						width: 100%;
					}
				`}
			</style>
		</Layout>
	);
}

export default Articles;
