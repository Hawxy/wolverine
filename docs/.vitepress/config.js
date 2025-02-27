import {BUNDLED_LANGUAGES} from 'shiki'
import {withMermaid} from "vitepress-plugin-mermaid"

// Include `cs` as alias for csharp
BUNDLED_LANGUAGES
    .find(lang => lang.id === 'csharp').aliases.push('cs');

export default withMermaid({
    base: '/',
    lang: 'en-US',
    title: 'Wolverine',
    description: 'Next Generation Command and Message Bus for .NET',
    head: [
        ['link', {rel: 'apple-touch-icon', type: 'image/png', size: "180x180", href: '/apple-icon-180x180.png'}],
        ['link', {rel: 'icon', type: 'image/png', size: "32x32", href: '/favicon-32x32.png'}],
        ['link', {rel: 'icon', type: 'image/png', size: "16x16", href: '/favicon-16x16.png'}],
        ['link', {rel: 'manifest', manifest: '/manifest.json'}],
    ],
    lastUpdated: true,
    themeConfig: {
        logo: '/logo.png',

        nav: [
            {text: 'Guide', link: '/guide/concepts'},
            {text: 'Tutorials', link: '/tutorials/'},
            {
                text: 'Gitter | Join Chat',
                link: 'https://gitter.im/JasperFx/wolverine?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge'
            }
        ],

        algolia: {
            appId: 'IS2ZRHIXW9',
            apiKey: 'c8a9f5cb4e0f80733d0dadb4ae8d06ad',
            indexName: 'wolverine_index'
        },

        editLink: {
            pattern: 'https://github.com/JasperFx/wolverine/edit/main/docs/:path',
            text: 'Suggest changes to this page'
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © Jeremy D. Miller and contributors.',
        },

        sidebar: {
            '/': [
                {
                    text: 'Tutorials',
                    collapsible: true,
                    items: [
                        {text: 'Getting Started', link: '/tutorials/getting-started'},
                        {text: 'Wolverine as Mediator', link: '/tutorials/mediator'},
                        {text: 'Best Practices', link: '/tutorials/best-practices'},
                        {text: 'Ping/Pong Messaging', link: '/tutorials/ping-pong'},
                    ]
                },
                {
                    text: 'General',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {text: 'Basic Concepts', link: '/guide/concepts'},
                        {text: 'Configuration', link: '/guide/configuration'},
                        {text: 'Instrumentation, Diagnostics, and Logging', link: '/guide/logging'},
                        {text: 'Test Automation Support', link: '/guide/testing'},
                        {text: 'Command Line Integration', link: '/guide/command-line'},
                        {text: 'Runtime Architecture', link: '/guide/runtime'},
                        {text: 'Extensions', link: '/guide/extensions'}
                    ]
                },
                {
                    text: 'Messages and Handlers',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {text: 'Messages and Serialization', link: '/guide/messages'},
                        {
                            text: 'Message Handlers', link: '/guide/handlers/', items: [
                                {text: 'Discovery', link: '/guide/handlers/discovery'},
                                {text: 'Error Handling', link: '/guide/handlers/error-handling'},
                                {text: 'Cascading Messages', link: '/guide/handlers/cascading'},
                                {text: 'Middleware', link: '/guide/handlers/middleware'},
                                {text: 'Execution Timeouts', link: '/guide/handlers/timeout'},
                                {text: 'Fluent Validation Middleware', link: '/guide/handlers/fluent-validation'}
                            ]
                        },
                    ]
                },
                {
                    text: 'Executing Messages',
                    collapsible: true,
                    collapsed: true,
                    items: [{text: 'Use as Command Bus', link: '/guide/command-bus'}]
                },
                {
                    text: 'Wolverine as Message Bus',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {text: 'Getting Started', link: '/guide/messaging/'},
                        {text: 'Sending Messages', link: '/guide/messaging/sending-messages'},
                        {
                            text: 'Transports', 
                            items: [
                                {text: 'Rabbit MQ', link: '/guide/messaging/transports/rabbitmq'},
                                {text: 'Azure Service Bus', link: '/guide/messaging/transports/azure-service-bus'},
                                {text: 'Amazon SQS', link: '/guide/messaging/transports/sqs'},
                                {text: 'TCP', link: '/guide/messaging/transports/tcp'},
                                {text: 'Pulsar', link: '/guide/messaging/transports/pulsar'},
                            ]
                        },

                        {text: 'Message Routing', link: '/guide/messaging/routing'},
                        {text: 'Message Expiration', link: '/guide/messaging/expiration'},
                        {text: 'MassTransit Interop', link: '/guide/messaging/transports/masstransit'},
                        {text: 'NServiceBus Interop', link: '/guide/messaging/transports/nservicebus'},
                    ]
                },
                {
                    text: 'Durability and Persistence',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {text: 'Durable Inbox and Outbox Messaging', link: '/guide/durability/'},
                        {text: 'Sagas', link: '/guide/durability/sagas'},
                        {text: 'Marten Integration', link: '/guide/durability/marten'},
                        {text: 'Entity Framework Core Integration', link: '/guide/durability/efcore'}
                    ]
                },

            ]
        }
    },
    markdown: {
        linkify: false
    },
    ignoreDeadLinks: true
})

