import Graphics = PIXI.Graphics;


export class DisplayObject extends PIXI.Container {

    private static ID: number = 1;
    private static G: number = 9.81;

    public readonly id: any;
    public stage: any;
    public graphics?: any;
    public velocity: any;
    public acceleration: any;
    public friction: any;
    public forces: any;
    public mass: any;
    public gravity: any;
    
    constructor (stage, appendGraphics?) {
        super();
        // params
        appendGraphics = typeof(appendGraphics) == 'undefined' ? true : appendGraphics;

        // attributes
        this.id = DisplayObject.ID ++;
        this.stage = stage;
        this.graphics = undefined;
        this.velocity = new PIXI.Point(0, 0);
        this.acceleration = new PIXI.Point(0, 0);
        this.friction = new PIXI.Point(0, 0);
        this.forces = {};
        this.mass = 1;
        this.gravity = false;

        // this.graphics
        if (appendGraphics) {
            this.graphics = new Graphics();
            this.addChild(this.graphics);
        }
    }

    setForce (name, vector) {
        this.forces[name] = vector;
    }

    clearForce (name) {
        delete this.forces[name];
    }

    clearForces () {
        this.forces = {};
    }

    setFriction (value) {
        if (typeof (value.x) === "undefined")
            this.friction = new PIXI.Point(value, value);
        else
            this.friction.set(value.x, value.y);
    }

    setGravity (g) {
        this.gravity = g;
    }

    /** Updates the DisplayObject position, velocity & acceleration */
    update(delta) {
        // friction
        this.setForce('friction', new PIXI.Point(
            - this.friction.x * this.velocity.x,
            - this.friction.y * this.velocity.y
        ));

        // gravity
        if (this.gravity) {
            this.setForce('gravity', new PIXI.Point(
                0,
                DisplayObject.G
            ));
        }

        // acceleration
        this.acceleration.set(0, 0);
        for (var forceName in this.forces) {
            this.acceleration.x += this.forces[forceName].x;
            this.acceleration.y += this.forces[forceName].y;
        }
        this.acceleration.x /= this.mass;
        this.acceleration.y /= this.mass;

        // velocity
        this.velocity.x += delta * this.acceleration.x;
        this.velocity.y += delta * this.acceleration.y;

        // position
        this.position.x += delta * this.velocity.x;
        this.position.y += delta * this.velocity.y;
    }
}

