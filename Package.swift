// swift-tools-version:5.3
import PackageDescription
let package = Package(
    name: "webassembly-example-react",
    platforms: [.macOS(.v10_15)],
    products: [
        .executable(name: "webassembly-example-react", targets: ["webassembly-example-react"])
    ],
    dependencies: [
        .package(name: "Tokamak", url: "https://github.com/TokamakUI/Tokamak", from: "0.5.1")
    ],
    targets: [
        .target(
            name: "webassembly-example-react",
            dependencies: [
                .product(name: "TokamakShim", package: "Tokamak")
            ]),
        .testTarget(
            name: "webassembly-example-reactTests",
            dependencies: ["webassembly-example-react"]),
    ]
)