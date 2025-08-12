import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ProjectionEventStream } from '@effectiv-crm/infrastructure';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  constructor(private readonly projectionEventStream: ProjectionEventStream) {}

  async onApplicationBootstrap() {
    this.projectionEventStream.rebuildAll();
  }
}
