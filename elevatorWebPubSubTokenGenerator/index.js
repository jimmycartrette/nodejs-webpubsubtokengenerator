const { WebPubSubServiceClient } = require('@azure/web-pubsub');



module.exports = async function (context, req) {
    let serviceClient = new WebPubSubServiceClient(process.env.WebPubSubConnectionString, 'elevator');
    const id = (req.query.id || (req.body && req.body.id));
    if (!id) {
        context.res = {
            status: 400,
            body: "missing user id"
        }
        return;
    };
    let token = await serviceClient.getClientAccessToken({ userId: id });
    context.res.json({
        url: token.url
    });

}
