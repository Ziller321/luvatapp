resource "aws_api_gateway_rest_api" "api" {
  name        = "${local.resource_prefix}_api"
}


resource "aws_api_gateway_resource" "locations_resource" {
  path_part = "locations"
  parent_id = "${aws_api_gateway_rest_api.api.root_resource_id}"
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
}
resource "aws_api_gateway_method" "locations_get_method" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.locations_resource.id}"
  http_method   = "GET"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "locations_integration" {
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  resource_id             = "${aws_api_gateway_resource.locations_resource.id}"
  http_method             = "${aws_api_gateway_method.locations_get_method.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.locations_lambda_function.arn}/invocations"
}




resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
    "aws_api_gateway_integration.locations_integration",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "test"
}
resource "aws_lambda_permission" "locations_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.locations_lambda_function.arn}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_deployment.deployment.execution_arn}/*/*"
}

output "base_url" {
  value = "${aws_api_gateway_deployment.deployment.invoke_url}"
}

