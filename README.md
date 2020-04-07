# Getting Started

[Visit the Happy Cog Wiki](https://wiki.happycog.com/display/VMG/Getting+Started)

The Happy Cog Wiki will have a complete set of resources as it pertains to Craft CMS, Author Experience, and our development process.

Once setup, you should remove this README and replace it with a version relevant to your project.

Below is a quick start guide for getting up and running now:

## Quick Start Guide

### Prerequisites

1. You are running Docker and Dash with HC’s standard Dash setup
2. You have [AWS setup](https://wiki.vectormediagroup.com/pages/viewpage.action?pageId=7602927) and are [authenticated](https://wiki.vectormediagroup.com/display/VMG/Local+environment+setup).
3. You have NFS setup per this [gist](https://gist.github.com/taylordaughtry/7dbb560af87152b2904d0867391e76cc)

### Setup

1. Use this template to create a new repo
2. Duplicate `.env.example` to `.env`
3. Replace the values in `.env` that say `REPLACE ME`
4. From the command line run `dev up --build`
5. From the command line run `make bash` then `composer install --no-scripts`
6. From the command line run `make bash` then `./craft setup`
7. Follow the prompts
8. Craft should now be successfully installed and our base `project.yml` applied
9. Login to the Control Panel and customize to your needs per your content model planning document

### What’s Happening

1. When you `dev up` you are starting your `web` container which runs Craft and starting a Node container which manages your FED process. The Node container is watching your files for changes out of the box.
2. All compiling of code should be done in a Docker container.
3. There are default templates and plugins installed. You may tweak to your needs, though this base repo has our standard approaches.
4. There is a custom module in place for styling the login page, along with quick injection points for minor CP changes.
